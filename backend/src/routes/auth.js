import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import { db } from '../config/database.js';
import { hashPassword, verifyPassword, generateToken, getClientIp, getDeviceInfo } from '../utils/auth.js';
import { sendPasswordResetEmail } from '../utils/email.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter, passwordResetLimiter } from '../middleware/rateLimit.js';
import { config } from '../config/env.js';
import { db as eventsDb } from '../config/database.js';

const router = express.Router();

// Password reset tokens storage (in production, use Redis or database)
const passwordResetTokens = new Map();

/**
 * Register with email + password
 */
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    // Check if user exists
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    
    // Hash password
    const passwordHash = await hashPassword(password);
    
    // Get tracking data
    const ip = getClientIp(req);
    const deviceInfo = getDeviceInfo(req);
    const utmSource = req.query.utm_source || req.body.utm_source;
    const utmMedium = req.query.utm_medium || req.body.utm_medium;
    const utmCampaign = req.query.utm_campaign || req.body.utm_campaign;
    const referrer = req.headers.referer || req.body.referrer;
    const firstPage = req.body.first_page || '/';
    
    // Create user
    const user = await db.users.create({
      email,
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
      last_login_ip: ip,
      ip_history: [ip],
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      referrer,
      first_visit: new Date().toISOString(),
      first_page: firstPage,
    });
    
    // Track event
    await eventsDb.events.create({
      user_id: user.id,
      event_name: 'user_registered',
      properties: { method: 'email', email },
      device_info: deviceInfo,
    });
    
    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Login with email + password
 */
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = await db.users.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Verify password
    if (!user.password_hash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const isValid = await verifyPassword(user.password_hash, password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Update last login
    const ip = getClientIp(req);
    const deviceInfo = getDeviceInfo(req);
    await db.users.updateLastLogin(user.id, ip);
    
    // Track event
    await eventsDb.events.create({
      user_id: user.id,
      event_name: 'user_logged_in',
      properties: { method: 'email' },
      device_info: deviceInfo,
    });
    
    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        discord_id: user.discord_id,
        telegram_user_id: user.telegram_user_id,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Discord OAuth callback
 */
router.get('/discord/callback', async (req, res, next) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect(`${config.frontendUrl}/auth/error?error=no_code`);
    }
    
    // Exchange code for access token
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', 
      new URLSearchParams({
        client_id: config.discordClientId,
        client_secret: config.discordClientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.discordRedirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    const { access_token } = tokenResponse.data;
    
    // Get user info from Discord
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    const discordUser = userResponse.data;
    
    // Find or create user
    let user = await db.users.findByDiscordId(discordUser.id);
    
    const ip = getClientIp(req);
    const deviceInfo = getDeviceInfo(req);
    
    if (user) {
      // Update Discord info
      user = await db.users.update(user.id, {
        discord_id: discordUser.id,
        discord_username: discordUser.username,
        discord_avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null,
        discord_email: discordUser.email,
        last_login_at: new Date().toISOString(),
        last_login_ip: ip,
      });
      
      await db.users.updateLastLogin(user.id, ip);
    } else {
      // Check if email exists
      if (discordUser.email) {
        user = await db.users.findByEmail(discordUser.email);
      }
      
      if (user) {
        // Link Discord to existing account
        user = await db.users.update(user.id, {
          discord_id: discordUser.id,
          discord_username: discordUser.username,
          discord_avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null,
          discord_email: discordUser.email,
          last_login_at: new Date().toISOString(),
          last_login_ip: ip,
        });
      } else {
        // Create new user
        user = await db.users.create({
          email: discordUser.email || null,
          discord_id: discordUser.id,
          discord_username: discordUser.username,
          discord_avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null,
          discord_email: discordUser.email || null,
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          last_login_ip: ip,
          ip_history: [ip],
          first_visit: new Date().toISOString(),
        });
      }
      
      await db.users.updateLastLogin(user.id, ip);
    }
    
    // Track event
    await eventsDb.events.create({
      user_id: user.id,
      event_name: 'user_logged_in',
      properties: { method: 'discord', discord_id: discordUser.id },
      device_info: deviceInfo,
    });
    
    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });
    
    // Redirect to frontend with token
    res.redirect(`${config.frontendUrl}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Discord OAuth error:', error);
    res.redirect(`${config.frontendUrl}/auth/error?error=discord_auth_failed`);
  }
});

/**
 * Telegram login widget handler
 */
router.post('/telegram', authLimiter, async (req, res, next) => {
  try {
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.body;
    
    if (!id || !auth_date || !hash) {
      return res.status(400).json({ error: 'Missing required Telegram auth data' });
    }
    
    // Verify hash (Telegram auth hash verification)
    const dataCheckString = Object.keys(req.body)
      .filter(key => key !== 'hash')
      .sort()
      .map(key => `${key}=${req.body[key]}`)
      .join('\n');
    
    const secretKey = crypto
      .createHash('sha256')
      .update(config.telegramBotToken)
      .digest();
    
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');
    
    if (calculatedHash !== hash) {
      return res.status(401).json({ error: 'Invalid Telegram auth hash' });
    }
    
    // Check if auth is recent (within 24 hours)
    const authDate = parseInt(auth_date);
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 86400) {
      return res.status(401).json({ error: 'Telegram auth expired' });
    }
    
    // Find or create user
    let user = await db.users.findByTelegramId(id);
    
    const ip = getClientIp(req);
    const deviceInfo = getDeviceInfo(req);
    
    if (user) {
      // Update Telegram info
      user = await db.users.update(user.id, {
        telegram_user_id: id,
        telegram_username: username,
        last_login_at: new Date().toISOString(),
        last_login_ip: ip,
      });
      
      await db.users.updateLastLogin(user.id, ip);
    } else {
      // Check if we should link to existing account (if user is authenticated)
      if (req.user) {
        user = await db.users.findById(req.user.id);
        if (user) {
          user = await db.users.update(user.id, {
            telegram_user_id: id,
            telegram_username: username,
            last_login_at: new Date().toISOString(),
            last_login_ip: ip,
          });
        }
      } else {
        // Create new user
        user = await db.users.create({
          telegram_user_id: id,
          telegram_username: username,
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          last_login_ip: ip,
          ip_history: [ip],
          first_visit: new Date().toISOString(),
        });
      }
      
      await db.users.updateLastLogin(user.id, ip);
    }
    
    // Track event
    await eventsDb.events.create({
      user_id: user.id,
      event_name: 'user_logged_in',
      properties: { method: 'telegram', telegram_user_id: id },
      device_info: deviceInfo,
    });
    
    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });
    
    res.json({
      message: 'Telegram login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        telegram_user_id: user.telegram_user_id,
        telegram_username: user.telegram_username,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Request password reset
 */
router.post('/reset-password', passwordResetLimiter, async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const user = await db.users.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists
      return res.json({ message: 'If the email exists, a reset link has been sent' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 3600000; // 1 hour
    
    passwordResetTokens.set(resetToken, {
      userId: user.id,
      email: user.email,
      expiresAt,
    });
    
    // Send email
    await sendPasswordResetEmail(user.email, resetToken);
    
    res.json({ message: 'If the email exists, a reset link has been sent' });
  } catch (error) {
    next(error);
  }
});

/**
 * Confirm password reset
 */
router.post('/reset-password/confirm', passwordResetLimiter, async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }
    
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    const resetData = passwordResetTokens.get(token);
    
    if (!resetData) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }
    
    if (Date.now() > resetData.expiresAt) {
      passwordResetTokens.delete(token);
      return res.status(400).json({ error: 'Reset token has expired' });
    }
    
    // Update password
    const passwordHash = await hashPassword(newPassword);
    await db.users.update(resetData.userId, {
      password_hash: passwordHash,
    });
    
    // Delete token
    passwordResetTokens.delete(token);
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
});

/**
 * Get current user profile
 */
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await db.users.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove sensitive data
    const { password_hash, ...userData } = user;
    
    res.json({ user: userData });
  } catch (error) {
    next(error);
  }
});

export default router;

