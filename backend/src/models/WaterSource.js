const mongoose = require('mongoose');

const waterSourceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'Default Water Source'
  },
  type: {
    type: String,
    enum: ['Borewell', 'Village Tank', 'Home Tap', 'River/Stream', 'Lake', 'Other'],
    default: 'Borewell'
  },
  location: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WaterSource', waterSourceSchema);
