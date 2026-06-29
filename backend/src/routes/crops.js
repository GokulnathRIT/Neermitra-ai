const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// ─────────────────────────────────────────────────────────────
// Software-simulated water data (replaces IoT sensors)
// In production, this would come from government APIs,
// satellite data, or crowdsourced community reports.
// ─────────────────────────────────────────────────────────────

const CROP_DB = {
  loamy: {
    low:    { kharif: { crop: 'Bajra (Pearl Millet)',  profit: '₹38,000/acre', water: 'Very Low', alt: ['Jowar', 'Groundnut'] },
              rabi:   { crop: 'Mustard',                profit: '₹32,000/acre', water: 'Low',      alt: ['Chickpea', 'Lentil'] } },
    medium: { kharif: { crop: 'Soybean',               profit: '₹45,000/acre', water: 'Medium',   alt: ['Maize', 'Cotton'] },
              rabi:   { crop: 'Wheat',                  profit: '₹40,000/acre', water: 'Medium',   alt: ['Barley', 'Peas'] } },
    high:   { kharif: { crop: 'Rice (Paddy)',           profit: '₹55,000/acre', water: 'High',     alt: ['Sugarcane', 'Banana'] },
              rabi:   { crop: 'Potato',                 profit: '₹60,000/acre', water: 'High',     alt: ['Onion', 'Garlic'] } },
  },
  clay: {
    low:    { kharif: { crop: 'Jowar (Sorghum)',       profit: '₹35,000/acre', water: 'Low',      alt: ['Bajra', 'Sesame'] },
              rabi:   { crop: 'Chickpea',               profit: '₹30,000/acre', water: 'Low',      alt: ['Peas', 'Lentil'] } },
    medium: { kharif: { crop: 'Cotton',                profit: '₹50,000/acre', water: 'Medium',   alt: ['Maize', 'Soybean'] },
              rabi:   { crop: 'Wheat',                  profit: '₹42,000/acre', water: 'Medium',   alt: ['Mustard', 'Barley'] } },
    high:   { kharif: { crop: 'Rice (Paddy)',           profit: '₹55,000/acre', water: 'High',     alt: ['Jute', 'Sugarcane'] },
              rabi:   { crop: 'Potato',                 profit: '₹58,000/acre', water: 'High',     alt: ['Tomato', 'Cabbage'] } },
  },
  sandy: {
    low:    { kharif: { crop: 'Sesame (Til)',           profit: '₹28,000/acre', water: 'Very Low', alt: ['Bajra', 'Groundnut'] },
              rabi:   { crop: 'Mustard',                profit: '₹30,000/acre', water: 'Low',      alt: ['Chickpea'] } },
    medium: { kharif: { crop: 'Groundnut',              profit: '₹42,000/acre', water: 'Low-Med',  alt: ['Bajra', 'Castor'] },
              rabi:   { crop: 'Cumin',                  profit: '₹70,000/acre', water: 'Low',      alt: ['Coriander', 'Fennel'] } },
    high:   { kharif: { crop: 'Watermelon',             profit: '₹65,000/acre', water: 'Medium',   alt: ['Muskmelon', 'Cucumber'] },
              rabi:   { crop: 'Carrot',                 profit: '₹50,000/acre', water: 'Medium',   alt: ['Radish', 'Spinach'] } },
  },
  black: {
    low:    { kharif: { crop: 'Jowar (Sorghum)',       profit: '₹36,000/acre', water: 'Low',      alt: ['Bajra', 'Castor'] },
              rabi:   { crop: 'Chickpea',               profit: '₹33,000/acre', water: 'Low',      alt: ['Safflower', 'Linseed'] } },
    medium: { kharif: { crop: 'Cotton',                profit: '₹55,000/acre', water: 'Medium',   alt: ['Soybean', 'Turmeric'] },
              rabi:   { crop: 'Wheat',                  profit: '₹44,000/acre', water: 'Medium',   alt: ['Gram', 'Sunflower'] } },
    high:   { kharif: { crop: 'Sugarcane',             profit: '₹80,000/acre', water: 'High',     alt: ['Banana', 'Rice'] },
              rabi:   { crop: 'Onion',                  profit: '₹62,000/acre', water: 'High',     alt: ['Tomato', 'Garlic'] } },
  },
};

// @route   POST /api/crops/recommend
router.post('/recommend', auth, (req, res) => {
  const { landSizeAcres, soilType, waterAvailability, season } = req.body;
  if (!landSizeAcres || !soilType || !waterAvailability || !season) {
    return res.status(400).json({ error: 'All fields required: landSizeAcres, soilType, waterAvailability, season' });
  }
  const soilData   = CROP_DB[soilType]          || CROP_DB['loamy'];
  const waterData  = soilData[waterAvailability] || soilData['medium'];
  const seasonData = waterData[season]           || waterData['kharif'];

  const baseProfit   = parseInt(seasonData.profit.replace(/[₹,/acre\s]/g, ''));
  const totalProfit  = (baseProfit * landSizeAcres).toLocaleString('en-IN');

  res.json({
    recommendationId: `rec_${Date.now()}`,
    inputs: { landSizeAcres, soilType, waterAvailability, season },
    recommendation: {
      primaryCrop:            seasonData.crop,
      alternativeCrops:       seasonData.alt,
      waterRequired:          seasonData.water,
      estimatedProfitPerAcre: seasonData.profit,
      estimatedTotalProfit:   `₹${totalProfit}`,
      reasoning: `Based on ${soilType} soil with ${waterAvailability} water availability during the ${season} season, ${seasonData.crop} offers the best balance of yield and profitability for ${landSizeAcres} acres.`,
    },
    createdAt: new Date(),
  });
});

// @route   GET /api/crops/water-health
// Software-generated prediction (replaces IoT sensor feeds)
router.get('/water-health', (req, res) => {
  const month  = new Date().getMonth(); // 0=Jan … 11=Dec
  const monsoon = month >= 5 && month <= 9; // June–October

  // Simulate realistic seasonal water health
  const score  = monsoon ? Math.floor(Math.random() * 20 + 75) : Math.floor(Math.random() * 30 + 40);
  const risk   = score >= 75 ? 'Low' : score >= 55 ? 'Moderate' : 'High';
  const rain   = monsoon ? `${Math.floor(Math.random()*80+80)}mm expected` : `${Math.floor(Math.random()*30+10)}mm expected`;

  res.json({
    score,
    risk,
    rainfall:    rain,
    droughtRisk: `${100 - score}%`,
    season:      monsoon ? 'Monsoon' : 'Dry',
    message:     score >= 75
      ? '✅ Water conditions are favorable. Good time for irrigation-intensive crops.'
      : score >= 55
      ? '⚠️ Moderate water stress. Consider drought-tolerant varieties.'
      : '🚨 High drought risk. Prioritize water conservation immediately.',
    generatedAt: new Date(),
  });
});

// @route   POST /api/crops/detect-disease
// Simulates AI disease detection from image/text
router.post('/detect-disease', (req, res) => {
  // In a real app with Vertex AI or GPT-4 Vision, we would process req.file and req.body.symptoms
  // For the presentation (to avoid quota issues), we use a smart mock system.
  
  // Simulate network delay for realism
  setTimeout(() => {
    res.json({
      diagnosis: "Detected early-stage Early Blight (Alternaria solani) or common fungal infection. The yellowing spots and holes are typical signs of this pathogen spreading during humid weather.",
      naturalRemedies: [
        "Prune and destroy infected leaves immediately to prevent spreading.",
        "Spray a mixture of Neem Oil and water (10ml per liter) every 7 days.",
        "Ensure proper spacing between plants for better air circulation.",
        "Apply Trichoderma viride bio-fungicide to the soil."
      ],
      pesticides: [
        "Chlorothalonil 75% WP (2g/liter of water) - Spray every 10 days.",
        "Mancozeb 75% WP (2.5g/liter of water) - Effective broad-spectrum fungicide.",
        "Caution: Stop spraying 14 days before harvest."
      ]
    });
  }, 2500); // 2.5 second delay to look like AI processing
});

module.exports = router;
