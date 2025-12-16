# Deployment Guide

## 🎯 Pre-Deployment Checklist

### 1. Database Setup ✅
- [x] Run `database/migrations.sql` in Supabase SQL Editor
- [x] Verify all tables are created
- [x] Test database connection

### 2. Environment Variables ✅
- [x] Create `.env` file with all credentials
- [x] Verify all API keys are correct
- [x] Set correct URLs (frontend/backend)

### 3. NOWPayments Configuration
- [ ] Create products in NOWPayments dashboard:
  - `discord_monthly` - $249.99
  - `echo_bot_monthly` - $349.99
  - `wallet_tracker_monthly` - $149.99
  - `all_in_trader` - $449.99
  - `discord_echo_bot` - $399.99
  - `discord_wallet_tracker` - $299.99
- [ ] Set IPN URL: `https://api.echotrades.com/api/webhooks/nowpayments`
- [ ] Set IPN Secret (match with `.env`)
- [ ] Test webhook with NOWPayments test payment

### 4. Discord OAuth Setup
- [ ] Add redirect URI: `https://echotrades.com/auth/discord/callback`
- [ ] Verify scopes: `identify`, `email`
- [ ] Test OAuth flow

### 5. Email Configuration
- [ ] Verify Resend API key is active
- [ ] Verify `noreply@echotrades.com` is verified in Resend
- [ ] Test email sending

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended for Node.js)
1. Install Vercel CLI: `npm i -g vercel`
2. In `backend` directory: `vercel`
3. Set environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

### Option 2: Railway
1. Connect GitHub repository
2. Select `backend` folder as root
3. Add all environment variables
4. Deploy automatically

### Option 3: Render
1. Create new Web Service
2. Connect repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

### Option 4: DigitalOcean App Platform
1. Create new App
2. Connect repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

## 🔧 Post-Deployment

1. **Test Health Endpoint:**
   ```bash
   curl https://api.echotrades.com/health
   ```

2. **Test NOWPayments Webhook:**
   - Make a test payment
   - Check logs for webhook receipt
   - Verify payment is saved in database

3. **Test Authentication:**
   - Test email registration
   - Test Discord OAuth
   - Test Telegram login

4. **Monitor Logs:**
   - Check for errors
   - Monitor rate limiting
   - Watch for failed webhooks

## 📊 Monitoring

- Set up error tracking (Sentry recommended)
- Monitor API response times
- Track webhook success rate
- Monitor database performance

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting active
- [ ] Environment variables secured
- [ ] Database credentials protected
- [ ] JWT secret is strong and unique
- [ ] NOWPayments IPN secret matches

## 🐛 Troubleshooting

### Webhook not receiving
- Check IPN URL is correct
- Verify IPN secret matches
- Check server logs
- Test with NOWPayments test webhook

### Database connection fails
- Verify Supabase URL and key
- Check network connectivity
- Verify table names match

### Email not sending
- Check Resend API key
- Verify sender email is verified
- Check email logs in Resend dashboard

## 📞 Support

For deployment issues: join.echo.trades@proton.me


