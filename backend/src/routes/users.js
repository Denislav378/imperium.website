import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import { db } from '../config/database.js';
import { hashPassword, verifyPassword } from '../utils/auth.js';
import { authenticate } from '../middleware/auth.js';
import { config } from '../config/env.js';
import { authLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

/**
 * Update user email
 */
router.put('/profile/email', authenticate, authLimiter, async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Check if email is already taken
    const existingUser = await db.users.findByEmail(email);
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    
    const user = await db.users.update(req.user.id, { email });
    
    res.json({
      message: 'Email updated successfully',
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
 * Update user password
 */
router.put('/profile/password', authenticate, authLimiter, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }
    
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }
    
    // Get user
    const user = await db.users.findById(req.user.id);
    if (!user || !user.password_hash) {
      return res.status(400).json({ error: 'User does not have a password set' });
    }
    
    // Verify current password
    const isValid = await verifyPassword(user.password_hash, currentPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Update password
    const newPasswordHash = await hashPassword(newPassword);
    await db.users.update(req.user.id, { password_hash: newPasswordHash });
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * Link Discord account
 */
router.post('/link/discord', authenticate, async (req, res, next) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Discord OAuth code is required' });
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
    
    // Check if Discord account is already linked to another user
    const existingUser = await db.users.findByDiscordId(discordUser.id);
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(409).json({ error: 'This Discord account is already linked to another user' });
    }
    
    // Update current user with Discord info
    const user = await db.users.update(req.user.id, {
      discord_id: discordUser.id,
      discord_username: discordUser.username,
      discord_avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : null,
      discord_email: discordUser.email || null,
    });
    
    res.json({
      message: 'Discord account linked successfully',
      user: {
        id: user.id,
        discord_id: user.discord_id,
        discord_username: user.discord_username,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Unlink Discord account
 */
router.delete('/link/discord', authenticate, async (req, res, next) => {
  try {
    const user = await db.users.update(req.user.id, {
      discord_id: null,
      discord_username: null,
      discord_avatar: null,
      discord_email: null,
    });
    
    res.json({
      message: 'Discord account unlinked successfully',
      user: {
        id: user.id,
        discord_id: user.discord_id,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Link Telegram account
 */
router.post('/link/telegram', authenticate, async (req, res, next) => {
  try {
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.body;
    
    if (!id || !auth_date || !hash) {
      return res.status(400).json({ error: 'Missing required Telegram auth data' });
    }
    
    // Verify hash (same as in auth route)
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
    
    // Check if Telegram account is already linked to another user
    const existingUser = await db.users.findByTelegramId(id);
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(409).json({ error: 'This Telegram account is already linked to another user' });
    }
    
    // Update current user with Telegram info
    const user = await db.users.update(req.user.id, {
      telegram_user_id: id,
      telegram_username: username,
    });
    
    res.json({
      message: 'Telegram account linked successfully',
      user: {
        id: user.id,
        telegram_user_id: user.telegram_user_id,
        telegram_username: user.telegram_username,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Unlink Telegram account
 */
router.delete('/link/telegram', authenticate, async (req, res, next) => {
  try {
    const user = await db.users.update(req.user.id, {
      telegram_user_id: null,
      telegram_username: null,
      telegram_chat_id: null,
    });
    
    res.json({
      message: 'Telegram account unlinked successfully',
      user: {
        id: user.id,
        telegram_user_id: user.telegram_user_id,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

