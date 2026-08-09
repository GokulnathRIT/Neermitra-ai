const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../middlewares/auth');
const User = require('../models/User');

// Initialize Razorpay only if keys exist
let razorpay = null;
const RAZORPAY_KEY_ID     = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET &&
    RAZORPAY_KEY_ID !== 'your_razorpay_key_id') {
  const Razorpay = require('razorpay');
  razorpay = new Razorpay({
    key_id:     RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
  console.log('✅ Razorpay initialized successfully.');
} else {
  console.log('⚠️  Razorpay running in MOCK mode. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env');
}

// Plan definitions (in paise — multiply ₹ by 100)
const PLANS = {
  premium: {
    name:     'NeerMitra Premium',
    amount:   700,   // ₹7 in paise
    currency: 'INR',
    description: 'Unlimited AI queries, crop planning & priority alerts',
  },
  ngo: {
    name:     'NeerMitra NGO / Government',
    amount:   499900,  // ₹4,999 in paise
    currency: 'INR',
    description: 'Data API access, custom dashboards & dedicated support',
  },
};

// ─────────────────────────────────────────────────
// @route   GET /api/payment/plans
// @desc    List all available plans
// @access  Public
// ─────────────────────────────────────────────────
router.get('/plans', (req, res) => {
  res.json({
    plans: Object.entries(PLANS).map(([key, plan]) => ({
      id: key,
      ...plan,
      amountDisplay: `₹${plan.amount / 100}`,
    })),
  });
});

// ─────────────────────────────────────────────────
// @route   POST /api/payment/create-order
// @desc    Create a Razorpay payment order
// @access  Private (auth required)
// ─────────────────────────────────────────────────
router.post('/create-order', auth, async (req, res) => {
  const { planId } = req.body;
  const plan = PLANS[planId];

  if (!plan) {
    return res.status(400).json({ error: 'Invalid plan. Choose "premium" or "ngo".' });
  }

  // MOCK MODE — no real Razorpay keys provided
  if (!razorpay) {
    return res.json({
      mock: true,
      orderId:  `mock_order_${Date.now()}`,
      amount:   plan.amount,
      currency: plan.currency,
      planName: plan.name,
      keyId:    'mock_key',
      message:  'Add your Razorpay keys in backend/.env to process real payments.',
    });
  }

  try {
    const order = await razorpay.orders.create({
      amount:   plan.amount,
      currency: plan.currency,
      receipt:  `rcpt_${Date.now()}`,
      notes: {
        userId:  req.user.id,
        email:   req.user.email,
        plan:    planId,
      },
    });

    res.json({
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      planName: plan.name,
      keyId:    RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ error: 'Failed to create payment order.' });
  }
});

// ─────────────────────────────────────────────────
// @route   POST /api/payment/verify
// @desc    Verify payment signature from Razorpay webhook
// @access  Private (auth required)
// ─────────────────────────────────────────────────
router.post('/verify', auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

  // MOCK MODE
  if (!razorpay) {
    return res.json({
      success:      true,
      mock:         true,
      message:      'Mock payment verified successfully! Add real Razorpay keys to process live payments.',
      subscription: planId,
      userId:       req.user.id,
    });
  }

  try {
    // Create expected signature using HMAC SHA256
    const body      = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected  = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment signature mismatch. Possible fraud.' });
    }

    // ✅ Payment is genuine — update user subscription in DB
    await User.findByIdAndUpdate(req.user.id, { plan: planId });

    res.json({
      success:      true,
      paymentId:    razorpay_payment_id,
      subscription: planId,
      message:      `🎉 Payment successful! Your ${planId} plan is now active.`,
    });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ error: 'Payment verification failed.' });
  }
});

// ─────────────────────────────────────────────────
// @route   POST /api/payment/webhook
// @desc    Razorpay webhook for server-side payment events
// @access  Public (Razorpay server)
// ─────────────────────────────────────────────────
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const secret    = process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret';

  try {
    const digest = crypto
      .createHmac('sha256', secret)
      .update(req.body)
      .digest('hex');

    if (digest !== signature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = JSON.parse(req.body);
    console.log('📦 Razorpay Webhook Event:', event.event);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      console.log(`✅ Payment captured: ₹${payment.amount / 100} from ${payment.email}`);
      // Update user subscription in database here
    }

    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
