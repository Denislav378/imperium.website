# Imperium Labs Backend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend` directory with the following content:

```env
# Server
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://echotrades.com
BACKEND_URL=https://api.echotrades.com

# Database - Supabase
SUPABASE_URL=https://wiovjypdiiprdaxrwzyt.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpb3ZqeXBkaWlwcmRheHJ3enl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTgxMDQ5NiwiZXhwIjoyMDgxMzg2NDk2fQ.FQYYp1iseACJLBKd1g_AY6md7vcghgJYMPrJZmEoyI4

# JWT
JWT_SECRET=99982abfa508230a118338adff1efdd525b454ba37b5a559a4636da81e16d691fa846934507e3806393d597c11d220ac858590c7a42ab059f40769f07c24291c
JWT_EXPIRES_IN=7d

# Discord OAuth
DISCORD_CLIENT_ID=1450171331537670315
DISCORD_CLIENT_SECRET=UxHf8KSlDC6dgad1fYARNkpmLvOjbeCM
DISCORD_REDIRECT_URI=https://echotrades.com/auth/discord/callback

# Telegram
TELEGRAM_BOT_TOKEN=8541334123:AAG6bPO5eX1cFZz0RKUPnJempsBZ69lMmDU
TELEGRAM_BOT_USERNAME=@echo_trades_bot

# NOWPayments
NOWPAYMENTS_API_KEY=PPKFKPW-88Y4Y23-KS7D1K0-RJYHWZH
NOWPAYMENTS_IPN_SECRET=MgZAvs4W+jzINva1X08IY3zvBzCTGi/Z
NOWPAYMENTS_MODE=production
NOWPAYMENTS_WEBHOOK_URL=https://api.echotrades.com/api/webhooks/nowpayments

# Email - Resend
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_GamGEoeH_CKFFX5Qjr5SPmaFoHtuB3tHz
EMAIL_FROM=noreply@echotrades.com

# Plans
PLAN_DISCORD_MONTHLY=discord_monthly
PLAN_ECHO_BOT_MONTHLY=echo_bot_monthly
PLAN_WALLET_TRACKER_MONTHLY=wallet_tracker_monthly
PLAN_ALL_IN_TRADER=all_in_trader
PLAN_DISCORD_PLUS_ECHO_BOT=discord_echo_bot
PLAN_DISCORD_PLUS_WALLET_TRACKER=discord_wallet_tracker

# Discord Invites
DISCORD_FREE_INVITE_URL=https://discord.gg/DRpMe6AC
DISCORD_PAID_INVITE_MODE=auto

# Support
SUPPORT_EMAIL=join.echo.trades@proton.me

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Setup Database
1. Go to your Supabase project dashboard
2. Open SQL Editor
3. Copy and paste the contents of `database/migrations.sql`
4. Run the SQL script

### 4. Configure NOWPayments
1. Log in to NOWPayments dashboard
2. Go to Settings → IPN (Instant Payment Notifications)
3. Set IPN URL to: `https://api.echotrades.com/api/webhooks/nowpayments`
4. Set IPN Secret to match your `NOWPAYMENTS_IPN_SECRET` in `.env`

### 5. Configure Discord OAuth
1. Go to https://discord.com/developers/applications
2. Select your application
3. Go to OAuth2 → Redirects
4. Add redirect URI: `https://echotrades.com/auth/discord/callback`

### 6. Start Server
```bash
npm run dev  # Development
npm start    # Production
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email + password
- `POST /api/auth/login` - Login with email + password
- `GET /api/auth/discord/callback` - Discord OAuth callback
- `POST /api/auth/telegram` - Telegram login
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/reset-password/confirm` - Confirm password reset
- `GET /api/auth/me` - Get current user (requires auth)

### Payments
- `POST /api/payments/webhooks/nowpayments` - NOWPayments webhook
- `GET /api/payments/history` - Payment history (requires auth)
- `GET /api/payments/subscriptions` - Active subscriptions (requires auth)
- `GET /api/payments/verify/:paymentId` - Verify payment status

### Users
- `PUT /api/users/profile/email` - Update email (requires auth)
- `PUT /api/users/profile/password` - Update password (requires auth)
- `POST /api/users/link/discord` - Link Discord (requires auth)
- `DELETE /api/users/link/discord` - Unlink Discord (requires auth)
- `POST /api/users/link/telegram` - Link Telegram (requires auth)
- `DELETE /api/users/link/telegram` - Unlink Telegram (requires auth)

### Tracking
- `POST /api/tracking/track` - Track event
- `GET /api/tracking/events` - Get user events (requires auth)

## 🔒 Security Notes

- All passwords are hashed with Argon2
- JWT tokens expire after 7 days
- Rate limiting is enabled on all endpoints
- CORS is configured for frontend domain only
- Webhook signatures are verified

## 🚨 Important

- Never commit `.env` file to git
- Keep `JWT_SECRET` and `NOWPAYMENTS_IPN_SECRET` secure
- Use HTTPS in production
- Regularly update dependencies

## 📞 Support

For issues, contact: join.echo.trades@proton.me

