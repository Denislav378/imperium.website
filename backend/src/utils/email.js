import { Resend } from 'resend';
import { config } from '../config/env.js';

const resend = new Resend(config.resendApiKey);

/**
 * Send email using Resend
 */
export async function sendEmail({ to, subject, html, text }) {
  try {
    const { data, error } = await resend.emails.send({
      from: config.emailFrom,
      to,
      subject,
      html,
      text,
    });
    
    if (error) {
      console.error('Email send error:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email, resetToken) {
  const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reset Your Imperium Labs Password</h1>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <p><a href="${resetUrl}" class="button">Reset Password</a></p>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
            <p>© ${new Date().getFullYear()} Imperium Labs. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const text = `
    Reset Your Imperium Labs Password
    
    You requested to reset your password. Click the link below to create a new password:
    
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request this, please ignore this email.
    
    © ${new Date().getFullYear()} Echo Trades. All rights reserved.
  `;
  
  return await sendEmail({
    to: email,
    subject: 'Reset Your Imperium Labs Password',
    html,
    text,
  });
}

/**
 * Send payment success email with Discord invite
 */
export async function sendPaymentSuccessEmail(email, planName, discordInviteUrl) {
  const planNames = {
    discord_monthly: 'Imperium Labs Discord',
    echo_bot_monthly: 'Echo Bot (Telegram AI)',
    wallet_tracker_monthly: 'Wallet Intelligence Engine',
    all_in_trader: 'All-In Trader',
    discord_echo_bot: 'Smart Trader Pack',
    discord_wallet_tracker: 'Market Watcher Pack',
  };
  
  const planDisplayName = planNames[planName] || planName;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Imperium Labs! 🎉</h1>
          <p>Thank you for your purchase of <strong>${planDisplayName}</strong>.</p>
          <p>Your payment has been confirmed and your access is now active.</p>
          ${discordInviteUrl ? `
            <p>Click the button below to join the paid Discord server:</p>
            <p><a href="${discordInviteUrl}" class="button">Join Discord Server</a></p>
            <p>Or copy and paste this link:</p>
            <p style="word-break: break-all; color: #666;">${discordInviteUrl}</p>
          ` : ''}
          <p>If you have any questions, contact us at ${config.supportEmail}</p>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Imperium Labs. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const text = `
    Welcome to Imperium Labs!
    
    Thank you for your purchase of ${planDisplayName}.
    Your payment has been confirmed and your access is now active.
    
    ${discordInviteUrl ? `Join the paid Discord server: ${discordInviteUrl}` : ''}
    
    If you have any questions, contact us at ${config.supportEmail}
    
    © ${new Date().getFullYear()} Echo Trades. All rights reserved.
  `;
  
  return await sendEmail({
    to: email,
    subject: `Welcome to Imperium Labs - ${planDisplayName} Access`,
    html,
    text,
  });
}

