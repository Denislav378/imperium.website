# 📚 Пълен Туториал - Deployment на Imperium Labs

## 🎯 Какво ще направим

1. Качване на GitHub
2. Deployment на Railway
3. Конфигуриране на Environment Variables
4. Настройка на NOWPayments
5. Настройка на Discord OAuth
6. Тестване на всичко

---

## 📦 СТЪПКА 1: Подготовка на GitHub

### 1.1. Проверка на Git статус

Отвори PowerShell в root директорията на проекта и изпълни:

```powershell
cd "C:\Users\Expert\OneDrive\Desktop\echo-trades-gold-gateway-92-main"
git status
```

### 1.2. Създаване на .gitignore (ако няма)

Провери дали има `.gitignore` файл. Ако няма, създай го:

```powershell
# Провери дали съществува
Test-Path .gitignore

# Ако не съществува, създай го
@"
node_modules/
.env
backend/.env
.DS_Store
*.log
dist/
build/
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

### 1.3. Инициализация на Git (ако няма)

```powershell
# Провери дали вече е git repository
Test-Path .git

# Ако не е, инициализирай
git init
```

### 1.4. Създаване на GitHub Repository

1. Отиди на https://github.com
2. Click "New repository" (или "+" → "New repository")
3. Име: `imperium-labs` (или каквото искаш)
4. Description: "Imperium Labs Trading Platform"
5. Public или Private (твоя избор)
6. НЕ създавай README, .gitignore или license (вече ги имаме)
7. Click "Create repository"

### 1.5. Добавяне на remote и push

GitHub ще ти покаже команди. Използвай тези (замени `YOUR_USERNAME` и `YOUR_REPO_NAME`):

```powershell
# Добави всички файлове
git add .

# Направи commit
git commit -m "Initial commit - Imperium Labs platform"

# Добави remote (замени с твоя URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Промени branch на main (ако е нужно)
git branch -M main

# Push към GitHub
git push -u origin main
```

**Ако GitHub изисква authentication:**
- Използвай Personal Access Token вместо password
- Създай token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Scopes: `repo` (пълни права)

---

## 🚂 СТЪПКА 2: Railway Deployment

### 2.1. Създаване на Railway акаунт

1. Отиди на https://railway.app
2. Click "Start a New Project"
3. Sign up/Sign in с GitHub
4. Authorize Railway да достъпва твоите repositories

### 2.2. Създаване на нов проект

1. В Railway dashboard, click "New Project"
2. Избери "Deploy from GitHub repo"
3. Избери твоя repository (`imperium-labs` или каквото си кръстил)
4. Railway ще започне да сканира проекта

### 2.3. Настройка на Root Directory

1. В Railway проект → Settings
2. Намери "Root Directory"
3. Въведи: `backend`
4. Save

### 2.4. Настройка на Build и Start команди

1. В Railway проект → Settings → Deploy
2. Build Command: (остави празно или `npm install`)
3. Start Command: `npm start`
4. Save

---

## 🔐 СТЪПКА 3: Environment Variables

### 3.1. Отваряне на Variables секцията

1. В Railway проект → Variables tab
2. Click "New Variable"

### 3.2. Добавяне на всички променливи

Добави всяка променлива поотделно (Name и Value):

```
NODE_ENV = production
```

```
PORT = 3000
```

```
FRONTEND_URL = https://echotrades.com
```

```
BACKEND_URL = https://YOUR_PROJECT.up.railway.app
```
**Важно:** Замени `YOUR_PROJECT` с реалния Railway URL (ще го получиш след deployment)

```
SUPABASE_URL = https://wiovjypdiiprdaxrwzyt.supabase.co
```

```
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpb3ZqeXBkaWlwcmRheHJ3enl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTgxMDQ5NiwiZXhwIjoyMDgxMzg2NDk2fQ.FQYYp1iseACJLBKd1g_AY6md7vcghgJYMPrJZmEoyI4
```

```
JWT_SECRET = 99982abfa508230a118338adff1efdd525b454ba37b5a559a4636da81e16d691fa846934507e3806393d597c11d220ac858590c7a42ab059f40769f07c24291c
```

```
JWT_EXPIRES_IN = 7d
```

```
DISCORD_CLIENT_ID = 1450171331537670315
```

```
DISCORD_CLIENT_SECRET = UxHf8KSlDC6dgad1fYARNkpmLvOjbeCM
```

```
DISCORD_REDIRECT_URI = https://echotrades.com/auth/discord/callback
```

```
TELEGRAM_BOT_TOKEN = 8541334123:AAG6bPO5eX1cFZz0RKUPnJempsBZ69lMmDU
```

```
TELEGRAM_BOT_USERNAME = @echo_trades_bot
```

```
NOWPAYMENTS_API_KEY = PPKFKPW-88Y4Y23-KS7D1K0-RJYHWZH
```

```
NOWPAYMENTS_IPN_SECRET = MgZAvs4W+jzINva1X08IY3zvBzCTGi/Z
```

```
NOWPAYMENTS_MODE = production
```

```
NOWPAYMENTS_WEBHOOK_URL = https://YOUR_PROJECT.up.railway.app/api/webhooks/nowpayments
```
**Важно:** Замени `YOUR_PROJECT` с реалния Railway URL

```
EMAIL_PROVIDER = resend
```

```
RESEND_API_KEY = re_GamGEoeH_CKFFX5Qjr5SPmaFoHtuB3tHz
```

```
EMAIL_FROM = noreply@echotrades.com
```

```
PLAN_DISCORD_MONTHLY = discord_monthly
```

```
PLAN_ECHO_BOT_MONTHLY = echo_bot_monthly
```

```
PLAN_WALLET_TRACKER_MONTHLY = wallet_tracker_monthly
```

```
PLAN_ALL_IN_TRADER = all_in_trader
```

```
PLAN_DISCORD_PLUS_ECHO_BOT = discord_echo_bot
```

```
PLAN_DISCORD_PLUS_WALLET_TRACKER = discord_wallet_tracker
```

```
DISCORD_FREE_INVITE_URL = https://discord.gg/DRpMe6AC
```

```
DISCORD_PAID_INVITE_MODE = auto
```

```
SUPPORT_EMAIL = join.echo.trades@proton.me
```

```
RATE_LIMIT_WINDOW_MS = 900000
```

```
RATE_LIMIT_MAX_REQUESTS = 100
```

### 3.3. Deployment

1. След като добавиш всички променливи, Railway автоматично ще започне deployment
2. Изчакай 2-3 минути
3. В Railway → Deployments → ще видиш статуса

### 3.4. Получаване на URL

1. В Railway проект → Settings → Domains
2. Ще видиш URL: `https://YOUR_PROJECT.up.railway.app`
3. Копирай този URL

### 3.5. Обновяване на BACKEND_URL и NOWPAYMENTS_WEBHOOK_URL

1. В Railway → Variables
2. Намери `BACKEND_URL` и обнови го с реалния URL
3. Намери `NOWPAYMENTS_WEBHOOK_URL` и обнови го:
   - `https://YOUR_PROJECT.up.railway.app/api/webhooks/nowpayments`
4. Railway автоматично ще редеплойне

---

## 💰 СТЪПКА 4: NOWPayments Configuration

### 4.1. Login в NOWPayments

1. Отиди на https://nowpayments.io
2. Login с твоя акаунт

### 4.2. Настройка на IPN (Webhook)

1. В NOWPayments dashboard → Settings
2. Намери "IPN Settings" или "Webhook Settings"
3. IPN URL: `https://YOUR_PROJECT.up.railway.app/api/webhooks/nowpayments`
   (Замени `YOUR_PROJECT` с реалния Railway URL)
4. IPN Secret: `MgZAvs4W+jzINva1X08IY3zvBzCTGi/Z`
5. Save

### 4.3. Създаване на Payment Links

1. В NOWPayments dashboard → Payment Links
2. Click "Create New Payment Link"

**За всеки план създай отделен Payment Link:**

#### Discord Monthly - $249.99
- **Name:** Imperium Labs Discord Monthly
- **Price:** 249.99
- **Currency:** USD
- **Order ID:** `discord_monthly`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- Click "Create"
- **Копирай Payment Link URL** (ще изглежда като: `https://nowpayments.io/payment/?iid=ABC123...`)

#### Echo Bot Monthly - $349.99
- **Name:** Echo Bot Telegram AI Monthly
- **Price:** 349.99
- **Currency:** USD
- **Order ID:** `echo_bot_monthly`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- Click "Create"
- **Копирай Payment Link URL**

#### Wallet Tracker Monthly - $149.99
- **Name:** Wallet Intelligence Engine Monthly
- **Price:** 149.99
- **Currency:** USD
- **Order ID:** `wallet_tracker_monthly`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- Click "Create"
- **Копирай Payment Link URL**

#### All-In Trader - $449.99
- **Name:** All-In Trader Monthly
- **Price:** 449.99
- **Currency:** USD
- **Order ID:** `all_in_trader`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- Click "Create"
- **Копирай Payment Link URL**

#### Smart Trader Pack - $399.99
- **Name:** Smart Trader Pack (Discord + Echo Bot)
- **Price:** 399.99
- **Currency:** USD
- **Order ID:** `discord_echo_bot`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- Click "Create"
- **Копирай Payment Link URL**

#### Market Watcher Pack - $299.99
- **Name:** Market Watcher Pack (Discord + Wallet)
- **Price:** 299.99
- **Currency:** USD
- **Order ID:** `discord_wallet_tracker`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- Click "Create"
- **Копирай Payment Link URL**

### 4.4. Добавяне на Payment Links в кода

1. Отвори `src/pages/Payment.tsx`
2. Намери редовете около 5-10:
   ```typescript
   const NOWPAYMENTS_DISCORD_MONTHLY_URL = 'https://nowpayments.io/payment/?iid=YOUR_PAYMENT_LINK_ID_DISCORD';
   ```
3. Замени всеки `YOUR_PAYMENT_LINK_ID_...` с реалния Payment Link URL от NOWPayments
4. Save файла
5. Commit и push към GitHub:
   ```powershell
   git add src/pages/Payment.tsx
   git commit -m "Add NOWPayments Payment Links"
   git push
   ```

---

## 🎮 СТЪПКА 5: Discord OAuth Setup

### 5.1. Отваряне на Discord Developer Portal

1. Отиди на https://discord.com/developers/applications
2. Login с твоя Discord акаунт

### 5.2. Избор на Application

1. Намери твоята application (Client ID: 1450171331537670315)
2. Click върху нея

### 5.3. Добавяне на Redirect URI

1. В лявото меню → OAuth2
2. Scroll down до "Redirects"
3. Click "Add Redirect"
4. Въведи: `https://echotrades.com/auth/discord/callback`
5. Click "Save Changes"

### 5.4. Проверка на Scopes

1. В същата страница (OAuth2)
2. Увери се че са избрани:
   - ✅ `identify`
   - ✅ `email`
3. Ако не са, избери ги и Save

---

## 🧪 СТЪПКА 6: Тестване

### 6.1. Тест на Health Endpoint

Отвори браузър или PowerShell и изпълни:

```powershell
# Замени YOUR_PROJECT с реалния Railway URL
curl https://YOUR_PROJECT.up.railway.app/health
```

**Очакван отговор:**
```json
{"status":"ok","timestamp":"2025-12-15T..."}
```

### 6.2. Тест на Webhook (опционално)

1. В NOWPayments dashboard → Payments
2. Направи тестов payment
3. Провери Railway logs дали webhook е получен:
   - Railway → Deployments → View Logs
   - Търси "NOWPayments webhook received"

### 6.3. Тест на Frontend

1. Отвори твоя frontend сайт
2. Отиди на `/payment` страницата
3. Натисни някой "Плати" бутон
4. Трябва да те пренасочи към NOWPayments checkout

### 6.4. Тест на Echo Bot

1. На главната страница, намери Echo Bot секцията
2. Натисни "Get Access to Echo Bot"
3. Трябва да се отвори Telegram bot

---

## ✅ Checklist

Използвай този checklist за да проследиш напредъка:

- [ ] Проектът е качен на GitHub
- [ ] Railway проект е създаден
- [ ] Root Directory е настроен на `backend`
- [ ] Всички Environment Variables са добавени в Railway
- [ ] Railway deployment е успешен
- [ ] Railway URL е получен
- [ ] BACKEND_URL е обновен с Railway URL
- [ ] NOWPAYMENTS_WEBHOOK_URL е обновен с Railway URL
- [ ] NOWPayments IPN URL е конфигуриран
- [ ] Всички 6 Payment Links са създадени в NOWPayments
- [ ] Payment Links са добавени в `src/pages/Payment.tsx`
- [ ] Промените са commit-нати и push-нати в GitHub
- [ ] Discord OAuth Redirect URI е добавен
- [ ] Health endpoint работи
- [ ] Frontend може да се свърже с backend

---

## 🆘 Troubleshooting

### Проблем: Railway deployment fails

**Решение:**
1. Провери Railway logs: Deployments → View Logs
2. Увери се че Root Directory е `backend`
3. Провери дали всички Environment Variables са добавени

### Проблем: Health endpoint не работи

**Решение:**
1. Провери Railway logs за грешки
2. Увери се че PORT=3000 е зададен
3. Провери дали deployment е завършил успешно

### Проблем: Webhook не получава payments

**Решение:**
1. Провери NOWPayments IPN URL е правилен
2. Провери Railway logs
3. Увери се че IPN Secret съвпада

### Проблем: Payment Links не работят

**Решение:**
1. Провери дали URL-ите са правилно копирани
2. Увери се че Order ID съвпада точно
3. Провери дали Payment Links са активни в NOWPayments

---

## 📞 Подкрепа

Ако имаш проблеми:
1. Провери Railway logs
2. Провери NOWPayments dashboard
3. Провери Discord Developer Portal
4. Email: join.echo.trades@proton.me

---

## 🎉 Готово!

След като завършиш всички стъпки, backend-ът ще е live на production и готов за използване!


