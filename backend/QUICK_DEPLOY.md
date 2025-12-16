# ⚡ Бърз Deployment - Railway (5 минути)

## Стъпка 1: Подготовка

1. Увери се че всички промени са commit-нати в GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

## Стъпка 2: Railway Setup

1. Отиди на https://railway.app
2. Sign up/Sign in с GitHub
3. Click "New Project"
4. Избери "Deploy from GitHub repo"
5. Избери твоя repository
6. Railway ще автоматично детектира `backend` folder

## Стъпка 3: Environment Variables

В Railway dashboard → Variables → Add всеки от следните:

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://echotrades.com
BACKEND_URL=https://YOUR_PROJECT.up.railway.app

SUPABASE_URL=https://wiovjypdiiprdaxrwzyt.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpb3ZqeXBkaWlwcmRheHJ3enl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTgxMDQ5NiwiZXhwIjoyMDgxMzg2NDk2fQ.FQYYp1iseACJLBKd1g_AY6md7vcghgJYMPrJZmEoyI4

JWT_SECRET=99982abfa508230a118338adff1efdd525b454ba37b5a559a4636da81e16d691fa846934507e3806393d597c11d220ac858590c7a42ab059f40769f07c24291c
JWT_EXPIRES_IN=7d

DISCORD_CLIENT_ID=1450171331537670315
DISCORD_CLIENT_SECRET=UxHf8KSlDC6dgad1fYARNkpmLvOjbeCM
DISCORD_REDIRECT_URI=https://echotrades.com/auth/discord/callback

TELEGRAM_BOT_TOKEN=8541334123:AAG6bPO5eX1cFZz0RKUPnJempsBZ69lMmDU
TELEGRAM_BOT_USERNAME=@echo_trades_bot

NOWPAYMENTS_API_KEY=PPKFKPW-88Y4Y23-KS7D1K0-RJYHWZH
NOWPAYMENTS_IPN_SECRET=MgZAvs4W+jzINva1X08IY3zvBzCTGi/Z
NOWPAYMENTS_MODE=production
NOWPAYMENTS_WEBHOOK_URL=https://YOUR_PROJECT.up.railway.app/api/webhooks/nowpayments

EMAIL_PROVIDER=resend
RESEND_API_KEY=re_GamGEoeH_CKFFX5Qjr5SPmaFoHtuB3tHz
EMAIL_FROM=noreply@echotrades.com

PLAN_DISCORD_MONTHLY=discord_monthly
PLAN_ECHO_BOT_MONTHLY=echo_bot_monthly
PLAN_WALLET_TRACKER_MONTHLY=wallet_tracker_monthly
PLAN_ALL_IN_TRADER=all_in_trader
PLAN_DISCORD_PLUS_ECHO_BOT=discord_echo_bot
PLAN_DISCORD_PLUS_WALLET_TRACKER=discord_wallet_tracker

DISCORD_FREE_INVITE_URL=https://discord.gg/DRpMe6AC
DISCORD_PAID_INVITE_MODE=auto

SUPPORT_EMAIL=join.echo.trades@proton.me

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Важно:** След като получиш Railway URL, обнови:
- `BACKEND_URL` с реалния URL
- `NOWPAYMENTS_WEBHOOK_URL` с реалния URL

## Стъпка 4: Deploy

1. Railway автоматично ще започне deployment
2. Изчакай да завърши (2-3 минути)
3. Ще получиш URL: `https://YOUR_PROJECT.up.railway.app`

## Стъпка 5: Тествай

```bash
curl https://YOUR_PROJECT.up.railway.app/health
```

Трябва да получиш: `{"status":"ok","timestamp":"..."}`

## Стъпка 6: Обнови NOWPayments

1. Отиди в NOWPayments dashboard
2. Settings → IPN Settings
3. Обнови IPN URL на: `https://YOUR_PROJECT.up.railway.app/api/webhooks/nowpayments`
4. Save

## Стъпка 7: Обнови Environment Variables

В Railway → Variables → Обнови:
- `BACKEND_URL` = твоя Railway URL
- `NOWPAYMENTS_WEBHOOK_URL` = твоя Railway URL + `/api/webhooks/nowpayments`

## Готово! 🎉

Backend-ът е live на production!

---

## 🆘 Ако има проблеми:

1. **Check Logs:** Railway → Deployments → View Logs
2. **Check Environment Variables:** Увери се че всички са добавени
3. **Test Health Endpoint:** `curl https://YOUR_URL/health`


