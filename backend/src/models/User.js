const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'ngo', 'admin'], default: 'farmer' },
  plan: { type: String, enum: ['free', 'premium', 'enterprise'], default: 'free' },
  referralCode: { type: String, unique: true, sparse: true },
  referredCount: { type: Number, default: 0 },
  usage: {
    diseaseScans: { type: Number, default: 0 },
    cropPlans: { type: Number, default: 0 }
  },
  resetToken: String,
  resetTokenExpiry: Date
}, { timestamps: true });

// Generate a random referral code before saving if not present
userSchema.pre('save', function() {
  if (!this.referralCode) {
    this.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
});

module.exports = mongoose.model('User', userSchema);
