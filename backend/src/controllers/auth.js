const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    
    // Process referral if provided
    if (referralCode) {
      const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
      if (referrer && referrer._id.toString() !== user._id.toString()) {
        referrer.referredCount += 1;
        // Upgrade to premium if they hit 7 referrals
        if (referrer.referredCount >= 7 && referrer.plan === 'free') {
          referrer.plan = 'premium';
        }
        await referrer.save();
      }
    }
    
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, plan: user.plan, referralCode: user.referralCode, referredCount: user.referredCount } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, plan: user.plan, referralCode: user.referralCode, referredCount: user.referredCount } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Simulate email sending by returning a success message
    // In production, generate a reset token and email it via SendGrid/AWS SES
    res.status(200).json({ message: 'If the email exists, a reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
