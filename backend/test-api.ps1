# PowerShell script for testing API endpoints

Write-Host "=== Imperium Labs Backend API Testing ===" -ForegroundColor Cyan
Write-Host ""

# 1. Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET
    Write-Host "Health Check OK" -ForegroundColor Green
    Write-Host "  Status: $($response.status)" -ForegroundColor Gray
    Write-Host "  Timestamp: $($response.timestamp)" -ForegroundColor Gray
} catch {
    Write-Host "Health Check Failed: $_" -ForegroundColor Red
}
Write-Host ""

# 2. User Registration
Write-Host "2. Testing User Registration..." -ForegroundColor Yellow
$testEmail = "test_$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
$testPassword = "TestPassword123!"

$registerBody = @{
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
    Write-Host "Registration Successful" -ForegroundColor Green
    Write-Host "  User ID: $($registerResponse.user.id)" -ForegroundColor Gray
    Write-Host "  Email: $($registerResponse.user.email)" -ForegroundColor Gray
    $token = $registerResponse.token
    Write-Host "  Token: $($token.Substring(0, 50))..." -ForegroundColor Gray
} catch {
    Write-Host "Registration Failed: $_" -ForegroundColor Red
    $token = $null
}
Write-Host ""

# 3. User Login
if ($token) {
    Write-Host "3. Testing User Login..." -ForegroundColor Yellow
    $loginBody = @{
        email = $testEmail
        password = $testPassword
    } | ConvertTo-Json
    
    try {
        $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
        Write-Host "Login Successful" -ForegroundColor Green
        Write-Host "  User ID: $($loginResponse.user.id)" -ForegroundColor Gray
        $token = $loginResponse.token
    } catch {
        Write-Host "Login Failed: $_" -ForegroundColor Red
    }
    Write-Host ""
}

# 4. Get Current User
if ($token) {
    Write-Host "4. Testing Get Current User..." -ForegroundColor Yellow
    $headers = @{
        Authorization = "Bearer $token"
    }
    
    try {
        $meResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method GET -Headers $headers
        Write-Host "Get User Successful" -ForegroundColor Green
        Write-Host "  User ID: $($meResponse.user.id)" -ForegroundColor Gray
        Write-Host "  Email: $($meResponse.user.email)" -ForegroundColor Gray
    } catch {
        Write-Host "Get User Failed: $_" -ForegroundColor Red
    }
    Write-Host ""
}

# 5. Track Event
Write-Host "5. Testing Event Tracking..." -ForegroundColor Yellow
$trackBody = @{
    event_name = "test_event"
    properties = @{
        test_property = "test_value"
        timestamp = (Get-Date).ToString("o")
    }
} | ConvertTo-Json

try {
    $trackResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/tracking/track" -Method POST -Body $trackBody -ContentType "application/json"
    Write-Host "Event Tracking Successful" -ForegroundColor Green
    Write-Host "  Message: $($trackResponse.message)" -ForegroundColor Gray
} catch {
    Write-Host "Event Tracking Failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Testing Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Webhook testing requires proper signature generation." -ForegroundColor Yellow
Write-Host "Run: npm run test:webhook-sig" -ForegroundColor Yellow
