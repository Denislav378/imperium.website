# 🚀 Production Deployment Guide

## Опции за Deployment

### 1. Railway (Препоръчително - Най-лесно) ⭐
### 2. Render (Безплатно, лесно)
### 3. Vercel (Добро за Node.js)
### 4. DigitalOcean App Platform
### 5. Heroku (платено)

---

## 🚂 Option 1: Railway (Най-лесно)

### Стъпки:

1. **Създай акаунт:**
   - Отиди на https://railway.app
   - Sign up с GitHub

2. **Създай нов проект:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Избери твоя repository
   - Избери `backend` folder като root directory

3. **Добави Environment Variables:**
   - В Railway dashboard → Variables
   - Добави всички променливи от `.env` файла:
     ```
     NODE_ENV=production
     PORT=3000
     FRONTEND_URL=https://echotrades.com
     BACKEND_URL=https://YOUR_RAILWAY_URL.up.railway.app
     
     SUPABASE_URL=...
     SUPABASE_SERVICE_ROLE_KEY=...
     JWT_SECRET=...
     DISCORD_CLIENT_ID=...
     DISCORD_CLIENT_SECRET=...
     TELEGRAM_BOT_TOKEN=...
     NOWPAYMENTS_API_KEY=...
     NOWPAYMENTS_IPN_SECRET=...
     RESEND_API_KEY=...
     EMAIL_FROM=...
     ... (всички останали)
     ```

4. **Настрой Build:**
   - Build Command: (празно или `npm install`)
   - Start Command: `npm start`

5. **Деплой:**
   - Railway автоматично ще деплойне
   - Ще получиш URL: `https://YOUR_PROJECT.up.railway.app`

6. **Обнови NOWPayments Webhook:**
   - Отиди в NOWPayments dashboard
   - Обнови webhook URL на: `https://YOUR_PROJECT.up.railway.app/api/webhooks/nowpayments`

---

## 🎨 Option 2: Render

### Стъпки:

1. **Създай акаунт:**
   - Отиди на https://render.com
   - Sign up с GitHub

2. **Създай нов Web Service:**
   - Click "New +" → "Web Service"
   - Connect твоя GitHub repository
   - Settings:
     - **Name:** `echo-trades-backend`
     - **Root Directory:** `backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Добави Environment Variables:**
   - В Render dashboard → Environment
   - Добави всички от `.env` файла

4. **Деплой:**
   - Render автоматично ще деплойне
   - Ще получиш URL: `https://echo-trades-backend.onrender.com`

5. **Обнови NOWPayments Webhook:**
   - Обнови URL на: `https://echo-trades-backend.onrender.com/api/webhooks/nowpayments`

---

## ▲ Option 3: Vercel

### Стъпки:

1. **Инсталирай Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Деплой:**
   ```bash
   cd backend
   vercel
   ```

3. **Добави Environment Variables:**
   - В Vercel dashboard → Settings → Environment Variables
   - Добави всички от `.env`

4. **Production Deploy:**
   ```bash
   vercel --prod
   ```

---

## 🐳 Option 4: DigitalOcean App Platform

### Стъпки:

1. **Създай акаунт:**
   - Отиди на https://cloud.digitalocean.com

2. **Създай нов App:**
   - Click "Create" → "Apps"
   - Connect GitHub repository
   - Settings:
     - **Type:** Web Service
     - **Source Directory:** `backend`
     - **Build Command:** `npm install`
     - **Run Command:** `npm start`

3. **Добави Environment Variables:**
   - В App Settings → App-Level Environment Variables

4. **Деплой:**
   - DigitalOcean автоматично ще деплойне

---

## ✅ Pre-Deployment Checklist

- [ ] Всички environment variables са добавени
- [ ] Database migrations са изпълнени в Supabase
- [ ] NOWPayments webhook URL е обновен
- [ ] CORS е конфигуриран за production frontend URL
- [ ] Health endpoint работи: `/health`
- [ ] Тествани са всички endpoints

---

## 🔧 Post-Deployment

1. **Тествай Health Endpoint:**
   ```bash
   curl https://YOUR_BACKEND_URL/health
   ```

2. **Тествай Webhook:**
   - Направи тестов payment в NOWPayments
   - Провери logs дали webhook е получен

3. **Мониторинг:**
   - Проверявай logs редовно
   - Настрой error tracking (Sentry)

---

## 📝 Важни бележки

- **Never commit `.env` file** - използвай environment variables в platform-а
- **HTTPS is required** - всички platforms предоставят HTTPS автоматично
- **Keep secrets secure** - не споделяй credentials публично
- **Monitor logs** - следди deployment за грешки

---

## 🆘 Troubleshooting

### Проблем: "Cannot connect to database"
- Провери Supabase credentials
- Провери дали IP не е блокиран (ако има firewall)

### Проблем: "Webhook not receiving"
- Провери webhook URL в NOWPayments
- Провери logs в deployment platform
- Провери дали signature verification работи

### Проблем: "CORS errors"
- Провери `FRONTEND_URL` environment variable
- Увери се че frontend URL е правилен

---

## 💰 Цени (приблизителни)

- **Railway:** $5-20/месец (има free tier)
- **Render:** Free tier (с ограничения), $7+/месец
- **Vercel:** Free за hobby, $20+/месец за pro
- **DigitalOcean:** $5+/месец

---

## 🎯 Препоръка

**Railway** е най-лесното и най-бързо за setup. Има добър free tier и лесно управление на environment variables.


