import express from 'express';
import crypto from 'crypto';
import axios from 'axios';
import { db } from '../config/database.js';
import { config } from '../config/env.js';
import { sendPaymentSuccessEmail } from '../utils/email.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * NOWPayments webhook handler
 */
router.post('/webhooks/nowpayments', express.raw({ type: 'application/json' }), async (req, res, next) => {
  try {
    const signature = req.headers['x-nowpayments-sig'];
    const payload = req.body.toString();
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha512', config.nowPaymentsIpnSecret)
      .update(payload)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      console.error('Invalid NOWPayments webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    const data = JSON.parse(payload);
    
    // Log webhook for debugging
    console.log('NOWPayments webhook received:', {
      payment_id: data.payment_id,
      payment_status: data.payment_status,
      order_id: data.order_id,
    });
    
    // Only process finished payments
    if (data.payment_status !== 'finished') {
      return res.status(200).json({ message: 'Payment not finished, skipping' });
    }
    
    // Check if payment already processed
    const existingPayment = await db.payments.findByNowPaymentsId(data.payment_id);
    if (existingPayment && existingPayment.status === 'finished') {
      return res.status(200).json({ message: 'Payment already processed' });
    }
    
    // Find or create user by email
    let user = null;
    if (data.customer_email) {
      user = await db.users.findByEmail(data.customer_email);
    }
    
    // If no user found, create one (or handle as guest payment)
    if (!user && data.customer_email) {
      user = await db.users.create({
        email: data.customer_email,
        created_at: new Date().toISOString(),
      });
    }
    
    // Determine plan from order_id or payment data
    let planName = data.order_id || 'unknown';
    
    // Map common plan identifiers
    const planMapping = {
      'discord_monthly': config.plans.discordMonthly,
      'echo_bot_monthly': config.plans.echoBotMonthly,
      'wallet_tracker_monthly': config.plans.walletTrackerMonthly,
      'all_in_trader': config.plans.allInTrader,
      'discord_echo_bot': config.plans.discordPlusEchoBot,
      'discord_wallet_tracker': config.plans.discordPlusWalletTracker,
    };
    
    if (planMapping[planName]) {
      planName = planMapping[planName];
    }
    
    // Create or update payment record
    let payment;
    if (existingPayment) {
      payment = await db.payments.update(existingPayment.id, {
        status: 'finished',
        webhook_data: data,
        updated_at: new Date().toISOString(),
      });
    } else {
      payment = await db.payments.create({
        user_id: user?.id || null,
        nowpayments_payment_id: data.payment_id,
        plan_name: planName,
        amount: parseFloat(data.price_amount || 0),
        currency: data.price_currency || 'usd',
        status: 'finished',
        customer_email: data.customer_email,
        webhook_data: data,
      });
    }
    
    // Create subscription if user exists
    if (user) {
      // Calculate expiration (30 days for monthly plans)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      
      await db.subscriptions.create({
        user_id: user.id,
        plan_name: planName,
        status: 'active',
        nowpayments_payment_id: data.payment_id,
        started_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      });
    }
    
    // Send Discord invite email if needed
    if (user && data.customer_email) {
      // Get paid Discord invite URL
      let discordInviteUrl = null;
      
      if (config.discordPaidInviteMode === 'auto') {
        // For now, use a placeholder - you'll need to generate this via Discord API
        // or use a permanent invite link
        discordInviteUrl = config.discordFreeInviteUrl; // Placeholder
      }
      
      // Send email
      try {
        await sendPaymentSuccessEmail(data.customer_email, planName, discordInviteUrl);
      } catch (emailError) {
        console.error('Failed to send payment success email:', emailError);
        // Don't fail the webhook if email fails
      }
    }
    
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('NOWPayments webhook error:', error);
    next(error);
  }
});

/**
 * Get payment history for authenticated user
 */
router.get('/history', authenticate, async (req, res, next) => {
  try {
    const payments = await db.payments.findByUserId(req.user.id);
    res.json({ payments });
  } catch (error) {
    next(error);
  }
});

/**
 * Get active subscriptions for authenticated user
 */
router.get('/subscriptions', authenticate, async (req, res, next) => {
  try {
    const subscriptions = await db.subscriptions.findActiveByUserId(req.user.id);
    res.json({ subscriptions });
  } catch (error) {
    next(error);
  }
});

/**
 * Verify payment status (for frontend success page)
 */
router.get('/verify/:paymentId', async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    
    // Try to find in database first
    const payment = await db.payments.findByNowPaymentsId(paymentId);
    
    if (payment) {
      return res.json({
        status: payment.status,
        plan: payment.plan_name,
        amount: payment.amount,
        currency: payment.currency,
      });
    }
    
    // If not in database, check with NOWPayments API
    try {
      const response = await axios.get(
        `https://api.nowpayments.io/v1/payment/${paymentId}`,
        {
          headers: {
            'x-api-key': config.nowPaymentsApiKey,
          },
        }
      );
      
      res.json({
        status: response.data.payment_status,
        plan: response.data.order_id,
        amount: response.data.price_amount,
        currency: response.data.price_currency,
      });
    } catch (apiError) {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;


