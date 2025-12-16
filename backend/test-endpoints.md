# API Endpoints Testing Guide

## 🧪 Тестване на API Endpoints

### 1. Health Check (вече работи ✅)
```bash
curl http://localhost:3000/health
```

---

## 2. User Registration

### Тест с curl:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"testpassword123\"}"
```

### Очакван отговор:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "test@example.com"
  }
}
```

### Тест с PowerShell:
```powershell
$body = @{
    email = "test@example.com"
    password = "testpassword123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

---

## 3. User Login

### Тест с curl:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"testpassword123\"}"
```

### Тест с PowerShell:
```powershell
$body = @{
    email = "test@example.com"
    password = "testpassword123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

---

## 4. Get Current User (requires authentication)

Първо вземи token от register/login, след това:

### Тест с curl:
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Тест с PowerShell:
```powershell
$token = "YOUR_TOKEN_HERE"
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method GET -Headers $headers
```

---

## 5. NOWPayments Webhook Test

### Тест с curl (симулиране на NOWPayments webhook):
```bash
curl -X POST http://localhost:3000/api/payments/webhooks/nowpayments \
  -H "Content-Type: application/json" \
  -H "x-nowpayments-sig: YOUR_SIGNATURE_HERE" \
  -d '{
    "payment_id": "test_payment_123",
    "payment_status": "finished",
    "price_amount": 249.99,
    "price_currency": "usd",
    "order_id": "discord_monthly",
    "customer_email": "test@example.com"
  }'
```

**Важно:** За да работи правилно, трябва да генерираш правилния signature. Виж секцията по-долу.

### Тест с PowerShell:
```powershell
$body = @{
    payment_id = "test_payment_123"
    payment_status = "finished"
    price_amount = 249.99
    price_currency = "usd"
    order_id = "discord_monthly"
    customer_email = "test@example.com"
} | ConvertTo-Json

# Note: Трябва да добавиш правилния signature в headers
Invoke-RestMethod -Uri "http://localhost:3000/api/payments/webhooks/nowpayments" -Method POST -Body $body -ContentType "application/json"
```

---

## 6. Track Event

### Тест с curl:
```bash
curl -X POST http://localhost:3000/api/tracking/track \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "button_click",
    "properties": {
      "button_name": "join_discord",
      "page": "home"
    }
  }'
```

### Тест с PowerShell:
```powershell
$body = @{
    event_name = "button_click"
    properties = @{
        button_name = "join_discord"
        page = "home"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/tracking/track" -Method POST -Body $body -ContentType "application/json"
```

---

## 🔐 Генериране на NOWPayments Webhook Signature

За да тестваш webhook правилно, трябва да генерираш правилния HMAC signature:

### Node.js скрипт за генериране:
```javascript
const crypto = require('crypto');

const payload = JSON.stringify({
  payment_id: "test_payment_123",
  payment_status: "finished",
  price_amount: 249.99,
  price_currency: "usd",
  order_id: "discord_monthly",
  customer_email: "test@example.com"
});

const secret = "MgZAvs4W+jzINva1X08IY3zvBzCTGi/Z"; // NOWPAYMENTS_IPN_SECRET
const signature = crypto
  .createHmac('sha512', secret)
  .update(payload)
  .digest('hex');

console.log('Signature:', signature);
console.log('Use this in x-nowpayments-sig header');
```

---

## 📝 Postman Collection

Ако използваш Postman, можеш да импортираш следните заявки:

1. **Register User**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/register`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "testpassword123"
     }
     ```

2. **Login**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "testpassword123"
     }
     ```

3. **Get Me**
   - Method: GET
   - URL: `http://localhost:3000/api/auth/me`
   - Headers:
     - `Authorization: Bearer YOUR_TOKEN`

4. **Track Event**
   - Method: POST
   - URL: `http://localhost:3000/api/tracking/track`
   - Body (JSON):
     ```json
     {
       "event_name": "test_event",
       "properties": {
         "test": "value"
       }
     }
     ```

---

## ⚠️ Важни бележки

1. **Database:** Уверете се че сте изпълнили migrations.sql в Supabase
2. **Environment Variables:** Проверете че `.env` файлът е правилно конфигуриран
3. **CORS:** Ако тестваш от браузър, може да има CORS проблеми. Backend е конфигуриран за `https://echotrades.com`
4. **Webhook Signature:** За production, NOWPayments ще генерира правилния signature автоматично


