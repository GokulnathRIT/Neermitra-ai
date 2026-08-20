const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini conditionally
let ai;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

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
router.post('/recommend', async (req, res) => {
  const { landSizeAcres, soilType, waterAvailability, season } = req.body;
  if (!landSizeAcres || !soilType || !waterAvailability || !season) {
    return res.status(400).json({ error: 'All fields required: landSizeAcres, soilType, waterAvailability, season' });
  }

  // Try real Gemini API first
  if (ai) {
    try {
      const prompt = `You are an expert Indian Agronomist. Recommend the most profitable crop for the following conditions in India:
Land Size: ${landSizeAcres} acres
Soil Type: ${soilType}
Water Availability: ${waterAvailability}
Season: ${season}

Respond ONLY with a raw JSON object in the following exact format (no markdown, no backticks, no extra text):
{
  "primaryCrop": "Name of best crop",
  "alternativeCrops": ["Alt 1", "Alt 2"],
  "waterRequired": "Low/Medium/High",
  "estimatedProfitPerAcre": "₹X,000/acre",
  "estimatedTotalProfit": "₹Total",
  "reasoning": "Brief 1-sentence scientific reason."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });

      const responseText = response.text;
      
      // Attempt to parse the JSON
      let resultData;
      try {
        resultData = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, ''));
      } catch (parseErr) {
        console.warn("Gemini response was not valid JSON, falling back.", responseText);
        throw parseErr;
      }

      return res.json({
        recommendationId: `rec_${Date.now()}`,
        inputs: { landSizeAcres, soilType, waterAvailability, season },
        recommendation: resultData,
        createdAt: new Date(),
      });

    } catch (err) {
      console.warn("⚠️ Real Gemini call failed for Crop Planner. Falling back to CROP_DB.", err.message);
      // Fall through to CROP_DB below
    }
  }

  // Fallback to static DB
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
router.post('/detect-disease', async (req, res) => {
  const { imageBase64, symptoms } = req.body;

  if (ai) {
    try {
      const prompt = `You are an AI agricultural assistant. Your FIRST job is to verify the image.
CRITICAL RULE: If the image shows a person, an animal, furniture, a selfie, or ANY non-plant object, you MUST IMMEDIATELY return:
{
  "diagnosis": "Invalid image: This does not appear to be a plant. Please upload a clear photo of a crop or leaf.",
  "naturalRemedies": [],
  "pesticides": []
}

If and ONLY IF the image is clearly a plant, leaf, or crop, then act as an expert plant pathologist to identify the disease or pest.
Return ONLY a raw JSON object in the following exact format:
{
  "diagnosis": "Detailed explanation of the disease",
  "naturalRemedies": ["remedy 1", "remedy 2"],
  "pesticides": ["chemical 1", "chemical 2"]
}
Symptoms described by user: ${symptoms || 'None'}`;

      const contents = [{ role: 'user', parts: [{ text: prompt }] }];

      if (imageBase64) {
        // extract mime type and base64 data from data URL
        const matches = imageBase64.match(/^data:(.*?);base64,(.+)$/);
        if (matches && matches.length === 3) {
          contents[0].parts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2]
            }
          });
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });

      const responseText = response.text;
      let resultData;
      try {
        resultData = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, ''));
      } catch (e) {
        console.warn("Vision response not JSON", responseText);
        throw e;
      }
      return res.json(resultData);

    } catch (err) {
      console.error("⚠️ Real Gemini Vision call failed.", err);
      return res.status(200).json({ 
        diagnosis: `Error: ${err.message}`, 
        naturalRemedies: [], 
        pesticides: [] 
      });
    }
  }

  // Fallback if no AI
  return res.json({
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
});

module.exports = router;
