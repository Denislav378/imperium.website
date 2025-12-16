import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimit.js';

// Routes
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payments.js';
import userRoutes from './routes/users.js';
import trackingRoutes from './routes/tracking.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));

// Rate limiting
app.use(generalLimiter);

// Body parsing - apply JSON parsing to all routes except webhooks
app.use((req, res, next) => {
  if (req.path.includes('/webhooks/nowpayments')) {
    return next(); // Skip JSON parsing for webhook (needs raw body)
  }
  express.json()(req, res, next);
});

app.use((req, res, next) => {
  if (req.path.includes('/webhooks/nowpayments')) {
    return next(); // Skip URL encoded parsing for webhook
  }
  express.urlencoded({ extended: true })(req, res, next);
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Imperium Labs API is running' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tracking', trackingRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Frontend URL: ${config.frontendUrl}`);
  console.log(`🔗 Backend URL: ${config.backendUrl}`);
});

