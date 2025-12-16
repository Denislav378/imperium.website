# PowerShell script to test authenticated endpoints

Write-Host "=== Testing Authenticated Endpoints ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Login to get a token
Write-Host "1. Logging in to get token..." -ForegroundColor Yellow
$loginBody = @{
    email = "test@example.com"
    password = "testpassword123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
    Write-Host "Login successful!" -ForegroundColor Green
    Write-Host "Token: $($token.Substring(0, 50))..." -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "Login failed. Trying registration first..." -ForegroundColor Yellow
    
    # Try registration if login fails
    $registerBody = @{
        email = "test@example.com"
        password = "testpassword123"
    } | ConvertTo-Json
    
    try {
        $registerResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
        $token = $registerResponse.token
        Write-Host "Registration successful!" -ForegroundColor Green
        Write-Host "Token: $($token.Substring(0, 50))..." -ForegroundColor Gray
        Write-Host ""
    } catch {
        Write-Host "Registration also failed: $_" -ForegroundColor Red
        exit 1
    }
}

# Step 2: Test Get Current User
Write-Host "2. Testing Get Current User (with token)..." -ForegroundColor Yellow
$headers = @{
    Authorization = "Bearer $token"
}

try {
    $meResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method GET -Headers $headers
    Write-Host "Get User Successful!" -ForegroundColor Green
    Write-Host "User ID: $($meResponse.user.id)" -ForegroundColor Gray
    Write-Host "Email: $($meResponse.user.email)" -ForegroundColor Gray
    Write-Host "Discord ID: $($meResponse.user.discord_id)" -ForegroundColor Gray
    Write-Host "Telegram ID: $($meResponse.user.telegram_user_id)" -ForegroundColor Gray
} catch {
    Write-Host "Get User Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Step 3: Test Get Payment History
Write-Host "3. Testing Get Payment History..." -ForegroundColor Yellow
try {
    $paymentsResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/payments/history" -Method GET -Headers $headers
    Write-Host "Payment History Retrieved!" -ForegroundColor Green
    Write-Host "Number of payments: $($paymentsResponse.payments.Count)" -ForegroundColor Gray
} catch {
    Write-Host "Payment History Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Step 4: Test Get Active Subscriptions
Write-Host "4. Testing Get Active Subscriptions..." -ForegroundColor Yellow
try {
    $subscriptionsResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/payments/subscriptions" -Method GET -Headers $headers
    Write-Host "Subscriptions Retrieved!" -ForegroundColor Green
    Write-Host "Number of active subscriptions: $($subscriptionsResponse.subscriptions.Count)" -ForegroundColor Gray
} catch {
    Write-Host "Subscriptions Failed: $_" -ForegroundColor Red
}
Write-Host ""

# Step 5: Test Get User Events
Write-Host "5. Testing Get User Events..." -ForegroundColor Yellow
try {
    $eventsResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/tracking/events" -Method GET -Headers $headers
    Write-Host "Events Retrieved!" -ForegroundColor Green
    Write-Host "Number of events: $($eventsResponse.events.Count)" -ForegroundColor Gray
} catch {
    Write-Host "Events Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Testing Complete ===" -ForegroundColor Cyan


