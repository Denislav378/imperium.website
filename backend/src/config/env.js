import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  
  // Database
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // Discord OAuth
  discordClientId: process.env.DISCORD_CLIENT_ID,
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
  discordRedirectUri: process.env.DISCORD_REDIRECT_URI,
  
  // Telegram
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramBotUsername: process.env.TELEGRAM_BOT_USERNAME,
  
  // NOWPayments
  nowPaymentsApiKey: process.env.NOWPAYMENTS_API_KEY,
  nowPaymentsIpnSecret: process.env.NOWPAYMENTS_IPN_SECRET,
  nowPaymentsMode: process.env.NOWPAYMENTS_MODE || 'sandbox',
  nowPaymentsWebhookUrl: process.env.NOWPAYMENTS_WEBHOOK_URL,
  
  // Email
  emailProvider: process.env.EMAIL_PROVIDER || 'resend',
  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM || 'noreply@echotrades.com',
  
  // Plans
  plans: {
    discordMonthly: process.env.PLAN_DISCORD_MONTHLY || 'discord_monthly',
    echoBotMonthly: process.env.PLAN_ECHO_BOT_MONTHLY || 'echo_bot_monthly',
    walletTrackerMonthly: process.env.PLAN_WALLET_TRACKER_MONTHLY || 'wallet_tracker_monthly',
    allInTrader: process.env.PLAN_ALL_IN_TRADER || 'all_in_trader',
    discordPlusEchoBot: process.env.PLAN_DISCORD_PLUS_ECHO_BOT || 'discord_echo_bot',
    discordPlusWalletTracker: process.env.PLAN_DISCORD_PLUS_WALLET_TRACKER || 'discord_wallet_tracker',
  },
  
  // Discord Invites
  discordFreeInviteUrl: process.env.DISCORD_FREE_INVITE_URL,
  discordPaidInviteMode: process.env.DISCORD_PAID_INVITE_MODE || 'auto',
  
  // Support
  supportEmail: process.env.SUPPORT_EMAIL || 'join.echo.trades@proton.me',
  
  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
};

// Validate required environment variables
const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
  'DISCORD_CLIENT_ID',
  'DISCORD_CLIENT_SECRET',
  'TELEGRAM_BOT_TOKEN',
  'NOWPAYMENTS_API_KEY',
  'NOWPAYMENTS_IPN_SECRET',
  'RESEND_API_KEY',
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}


