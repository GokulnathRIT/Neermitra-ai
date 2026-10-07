const mongoose = require('mongoose');

const waterReadingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  waterSourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WaterSource',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sourceType: {
    type: String,
    enum: ['MANUAL_INPUT', 'TEST_STRIP_SCAN', 'LAB_REPORT_OCR', 'IOT_SENSOR'],
    default: 'MANUAL_INPUT'
  },
  // Raw Parameters
  parameters: {
    ph: Number,
    tds: Number,
    turbidity: Number,
    ec: Number,
    temperature: Number,
    nitrates: Number,
    do: Number
  },
  // AI Analysis Results
  analysis: {
    score: Number,
    riskClass: String,
    modelVersion: String,
    confidence: Number,
    contributingFactors: [String],
    recommendation: String,
    availableParameters: [String]
  }
});

// Create index for fast time-series queries
waterReadingSchema.index({ waterSourceId: 1, timestamp: -1 });

module.exports = mongoose.model('WaterReading', waterReadingSchema);
