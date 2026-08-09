const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  water: { type: Number, required: true },
  cropHealth: { type: String, required: true },
  notes: { type: String, required: true },
}, { timestamps: true });

// TTL Index: Documents expire automatically 86400 seconds (24 hours) after createdAt
journalSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('Journal', journalSchema);
