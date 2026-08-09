require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function fixOldUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({ referralCode: { $exists: false } });
    for (const u of users) {
      u.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      await u.save();
    }
    console.log(`Updated ${users.length} users with missing referral codes.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixOldUsers();
