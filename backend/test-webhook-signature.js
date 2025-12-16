// Helper script to generate NOWPayments webhook signature for testing
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Test payload (same as what NOWPayments would send)
const testPayload = {
  payment_id: "test_payment_123",
  payment_status: "finished",
  price_amount: 249.99,
  price_currency: "usd",
  order_id: "discord_monthly",
  customer_email: "test@example.com",
  pay_address: "0x123...",
  pay_currency: "USDT",
  pay_amount: 250.00,
  actually_paid: 250.00,
  payment_extra_id: null,
  invoice_id: null,
  outcome_hash: null,
  smart_contract: null,
};

const payloadString = JSON.stringify(testPayload);
const secret = process.env.NOWPAYMENTS_IPN_SECRET || "MgZAvs4W+jzINva1X08IY3zvBzCTGi/Z";

const signature = crypto
  .createHmac('sha512', secret)
  .update(payloadString)
  .digest('hex');

console.log('='.repeat(60));
console.log('NOWPayments Webhook Test Signature Generator');
console.log('='.repeat(60));
console.log('\nPayload:');
console.log(JSON.stringify(testPayload, null, 2));
console.log('\nSignature (use in x-nowpayments-sig header):');
console.log(signature);
console.log('\nCurl command:');
console.log(`curl -X POST http://localhost:3000/api/payments/webhooks/nowpayments \\`);
console.log(`  -H "Content-Type: application/json" \\`);
console.log(`  -H "x-nowpayments-sig: ${signature}" \\`);
console.log(`  -d '${payloadString}'`);
console.log('\n' + '='.repeat(60));


