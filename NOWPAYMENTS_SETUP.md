# 🔗 NOWPayments Payment Links Setup

## Стъпка 1: Създай Payment Links в NOWPayments Dashboard

1. **Отиди в NOWPayments Dashboard:**
   - https://nowpayments.io/dashboard
   - Login с твоя акаунт

2. **Създай Payment Links:**
   - Отиди в "Payment Links" секцията
   - Click "Create New Payment Link"

3. **За всеки план създай отделен Payment Link:**

### Discord Monthly - $249.99
- **Name:** Echo Trades Discord Monthly
- **Price:** 249.99 USD
- **Order ID:** `discord_monthly`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- **Copy Payment Link** и го запази

### Echo Bot Monthly - $349.99
- **Name:** Echo Bot Telegram AI Monthly
- **Price:** 349.99 USD
- **Order ID:** `echo_bot_monthly`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- **Copy Payment Link**

### Wallet Tracker Monthly - $149.99
- **Name:** Wallet Intelligence Engine Monthly
- **Price:** 149.99 USD
- **Order ID:** `wallet_tracker_monthly`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- **Copy Payment Link**

### All-In Trader - $449.99
- **Name:** All-In Trader Monthly
- **Price:** 449.99 USD
- **Order ID:** `all_in_trader`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- **Copy Payment Link**

### Smart Trader Pack - $399.99
- **Name:** Smart Trader Pack (Discord + Echo Bot)
- **Price:** 399.99 USD
- **Order ID:** `discord_echo_bot`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- **Copy Payment Link**

### Market Watcher Pack - $299.99
- **Name:** Market Watcher Pack (Discord + Wallet)
- **Price:** 299.99 USD
- **Order ID:** `discord_wallet_tracker`
- **Success URL:** `https://echotrades.com/payment/success`
- **Cancel URL:** `https://echotrades.com/payment`
- **Copy Payment Link**

## Стъпка 2: Добави Payment Links в кода

След като получиш всички Payment Links, ги добави в `src/pages/Payment.tsx` файла.

Примерен формат на Payment Link:
```
https://nowpayments.io/payment/?iid=YOUR_PAYMENT_LINK_ID
```

## Стъпка 3: Тествай

1. Отвори сайта
2. Отиди на `/payment` страницата
3. Натисни някой "Плати" бутон
4. Трябва да те пренасочи към NOWPayments checkout страницата

## ⚠️ Важно

- **Order ID** трябва да съвпада точно с тези в кода
- **Success URL** трябва да сочи към твоя frontend
- **Webhook URL** трябва да сочи към твоя backend (вече е конфигуриран)


