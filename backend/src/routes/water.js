const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const WaterSource = require('../models/WaterSource');
const WaterReading = require('../models/WaterReading');

// 1. Get all water sources for a user
router.get('/sources', auth, async (req, res) => {
  try {
    let sources = await WaterSource.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    // Auto-create a default source if user has none
    if (sources.length === 0) {
      const defaultSource = new WaterSource({
        userId: req.user.id,
        name: 'Primary Water Source',
        type: 'Borewell'
      });
      await defaultSource.save();
      sources = [defaultSource];
    }
    
    res.json(sources);
  } catch (err) {
    console.error('Error fetching water sources:', err);
    res.status(500).json({ error: 'Server error fetching water sources' });
  }
});

// 2. Create a new water source
router.post('/sources', auth, async (req, res) => {
  try {
    const { name, type, location } = req.body;
    const newSource = new WaterSource({
      userId: req.user.id,
      name,
      type,
      location
    });
    await newSource.save();
    res.status(201).json(newSource);
  } catch (err) {
    console.error('Error creating water source:', err);
    res.status(500).json({ error: 'Server error creating water source' });
  }
});

// 3. Save a new Water Reading & AI Analysis
router.post('/readings', auth, async (req, res) => {
  try {
    const { waterSourceId, sourceType, parameters, analysis } = req.body;
    
    // Ensure the source belongs to the user
    const source = await WaterSource.findOne({ _id: waterSourceId, userId: req.user.id });
    if (!source) {
      return res.status(404).json({ error: 'Water source not found or unauthorized' });
    }

    const newReading = new WaterReading({
      userId: req.user.id,
      waterSourceId,
      sourceType: sourceType || 'MANUAL_INPUT',
      parameters,
      analysis
    });

    await newReading.save();
    res.status(201).json(newReading);
  } catch (err) {
    console.error('Error saving water reading:', err);
    res.status(500).json({ error: 'Server error saving water reading' });
  }
});

// 4. Get historical readings for a specific source
router.get('/readings/:sourceId', auth, async (req, res) => {
  try {
    const source = await WaterSource.findOne({ _id: req.params.sourceId, userId: req.user.id });
    if (!source) {
      return res.status(404).json({ error: 'Water source not found or unauthorized' });
    }

    // Limit to last 30 readings for MVP history
    const readings = await WaterReading.find({ waterSourceId: req.params.sourceId })
      .sort({ timestamp: -1 })
      .limit(30);

    res.json(readings);
  } catch (err) {
    console.error('Error fetching readings history:', err);
    res.status(500).json({ error: 'Server error fetching history' });
  }
});

// 5. OCR Endpoint: Extract data from Lab Reports
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/ocr', auth, upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const mimeType = req.file.mimetype;
    
    // Using gemini-2.5-flash for fast OCR
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: req.file.buffer.toString('base64'),
                mimeType
              }
            },
            {
              text: `You are an expert water quality lab report extractor.
Extract the following parameters from this document and return ONLY a valid JSON object. 
If a parameter is not found, set its value to null. 
Do not include markdown blocks or any other text, JUST the JSON.

Expected JSON schema:
{
  "ph": number,
  "tds": number,
  "turbidity": number,
  "ec": number,
  "temperature": number,
  "nitrates": number,
  "do": number
}`
            }
          ]
        }
      ]
    });

    const outputText = response.text || '';
    
    // Clean up potential markdown formatting (```json ... ```)
    let jsonStr = outputText.trim();
    if (jsonStr.startsWith('```json')) jsonStr = jsonStr.substring(7);
    if (jsonStr.startsWith('```')) jsonStr = jsonStr.substring(3);
    if (jsonStr.endsWith('```')) jsonStr = jsonStr.substring(0, jsonStr.length - 3);
    jsonStr = jsonStr.trim();

    try {
      const extractedData = JSON.parse(jsonStr);
      res.json(extractedData);
    } catch (parseError) {
      console.error('Failed to parse Gemini output:', outputText);
      res.status(500).json({ error: 'Failed to extract valid data from the report.' });
    }

  } catch (err) {
    console.error('Error processing OCR:', err);
    res.status(500).json({ error: 'Server error processing the lab report.' });
  }
});

// 6. Visual Assessment Endpoint: Analyze water image for apparent turbidity/color
router.post('/visual', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: req.file.buffer.toString('base64'),
                mimeType: req.file.mimetype
              }
            },
            {
              text: `You are a scientific water quality assistant. Analyze this photograph of water in a transparent container.
Do NOT invent exact chemical measurements (like exact pH or exact TDS).
ONLY assess these visual characteristics:
1. "cloudiness": The apparent turbidity (Clear, Slightly Cloudy, Cloudy, Very Turbid)
2. "color": The visible coloration (Colorless, Yellowish, Brownish, Greenish, etc.)
3. "particles": Are there visible suspended particles? (Yes, No, Unclear)
4. "safety_warning": A responsible safety warning based on visual appearance. E.g., "Visibly turbid water should not be consumed without filtration and testing."

Return ONLY a valid JSON object matching this schema:
{
  "cloudiness": string,
  "color": string,
  "particles": string,
  "safety_warning": string
}`
            }
          ]
        }
      ]
    });

    let jsonStr = (response.text || '').trim();
    if (jsonStr.startsWith('```json')) jsonStr = jsonStr.substring(7);
    if (jsonStr.startsWith('```')) jsonStr = jsonStr.substring(3);
    if (jsonStr.endsWith('```')) jsonStr = jsonStr.substring(0, jsonStr.length - 3);
    jsonStr = jsonStr.trim();

    try {
      const assessment = JSON.parse(jsonStr);
      res.json(assessment);
    } catch (parseError) {
      console.error('Failed to parse Gemini output:', response.text);
      res.status(500).json({ error: 'Failed to extract valid data from the image.' });
    }

  } catch (err) {
    console.error('Error processing Visual Assessment:', err);
    res.status(500).json({ error: 'Server error processing the image.' });
  }
});

module.exports = router;
