# Imperium Labs Backend API

Backend API for Imperium Labs platform with authentication, payments, and user management.

## Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Create `.env` file:**
Copy `.env.example` to `.env` and fill in all required values.

3. **Setup Database:**
- Go to your Supabase project
- Open SQL Editor
- Run `database/migrations.sql` to create all tables

4. **Start server:**
```bash
npm run dev  # Development with auto-reload
npm start    # Production
```

## Environment Variables

See `.env.example` for all required variables.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email + password
- `POST /api/auth/login` - Login with email + password
- `GET /api/auth/discord/callback` - Discord OAuth callback
- `POST /api/auth/telegram` - Telegram login
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/reset-password/confirm` - Confirm password reset
- `GET /api/auth/me` - Get current user profile

### Payments
- `POST /api/payments/webhooks/nowpayments` - NOWPayments webhook handler
- `GET /api/payments/history` - Get payment history (authenticated)
- `GET /api/payments/subscriptions` - Get active subscriptions (authenticated)
- `GET /api/payments/verify/:paymentId` - Verify payment status

### Users
- `PUT /api/users/profile/email` - Update email (authenticated)
- `PUT /api/users/profile/password` - Update password (authenticated)
- `POST /api/users/link/discord` - Link Discord account (authenticated)
- `DELETE /api/users/link/discord` - Unlink Discord (authenticated)
- `POST /api/users/link/telegram` - Link Telegram account (authenticated)
- `DELETE /api/users/link/telegram` - Unlink Telegram (authenticated)

### Tracking
- `POST /api/tracking/track` - Track event
- `GET /api/tracking/events` - Get user events (authenticated)

## Database Schema

See `database/migrations.sql` for complete schema.

## Security

- JWT tokens for authentication
- Argon2 password hashing
- Rate limiting on all endpoints
- CORS configured for frontend domain
- Input validation
- SQL injection protection via Supabase

## Deployment

1. Set all environment variables on your hosting platform
2. Run database migrations
3. Deploy the code
4. Configure NOWPayments webhook URL to point to your backend

## Notes

- Password reset tokens are stored in memory (use Redis in production)
- Discord invites are sent via email after payment confirmation
- All sensitive operations require authentication

