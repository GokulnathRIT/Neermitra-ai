const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI conditionally to prevent crashing if key is missing
let openai;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is healthy' });
});

// AI Advisor Route (Hybrid OpenAI + Intent Parser)
router.post('/', async (req, res) => {
  const { query } = req.body;
  const q = query.toLowerCase();

  // Try real OpenAI ChatGPT API first if initialized
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are NeerMitra AI, a super friendly farming advisor. Use emojis, be extremely concise (3 sentences max), and act like a helpful friend. Mention water conservation if relevant." },
          { role: "user", content: query }
        ],
        max_tokens: 150
      });
      return res.json({ response: completion.choices[0].message.content });
    } catch (err) {
      console.warn("⚠️ Real OpenAI call failed (maybe quota exceeded?). Falling back to intent parser.");
      // Fall through to intent parser below
    }
  }

  // Fallback Intent Parser
  let response = '';

  if (q.includes('disease') || q.includes('pest') || q.includes('yellow') || q.includes('spot')) {
    response = `Oh no, friend! 😟 It sounds like your crop might be facing a disease or pest attack.\n\nDon't worry! My advice is to immediately isolate the affected plants if possible. You can use our **Crop Doctor** feature to take a photo of the leaf. I will analyze the picture and tell you exactly what medicine to spray! 🌿🔍`;
  } else if (q.includes('rain') || q.includes('weather') || q.includes('water') || q.includes('drought')) {
    response = `Namaste! 🙏 The weather has been quite tricky lately, hasn't it? 🌦️\n\nIf you're worried about water scarcity, I highly recommend adopting **Drip Irrigation**. It saves up to 60% of water and keeps roots healthy! Also, keep an eye on our Dashboard for live Drought Risk alerts in your district! 💧`;
  } else if (q.includes('loan') || q.includes('scheme') || q.includes('money') || q.includes('fund')) {
    response = `Hello friend! Funding is so important for a successful harvest. 💰\n\nThe government has some excellent schemes right now. Have you checked the **PM-KISAN** scheme? You can get ₹6,000 per year directly in your bank! Head over to the "Government Schemes" section on my menu to see exactly how to apply! 🏦✅`;
  } else if (q.includes('fertilizer') || q.includes('yield') || q.includes('grow')) {
    response = `Great question! 🌱 To boost your yield, always start with a Soil Health Card. If your soil is lacking nitrogen, use Urea but don't overdo it! Also, consider rotating your crops with legumes (like beans) next season to naturally restore soil fertility! 🌾🚜`;
  } else if (q.includes('hlo') || q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('namaste')) {
    response = `Hello there, my friend! 👋 I am NeerMitra AI, your personal farming assistant. How can I help you today? 🌱\n\nYou can ask me about crop diseases, weather, fertilizers, or government loans!`;
  } else {
    response = `Namaste! 🙏 I am your NeerMitra AI friend! 🌱\n\nIt sounds like you need help with "${query}". Don't worry, I've got you covered! Here is my best advice:\n1. **Save Water:** Try using Drip Irrigation to save up to 60% of your water! 💧\n2. **Grow Smart:** If rainfall is low, Millets and Sorghum are excellent, highly profitable choices! 🌾\n3. **Get Free Money:** You might be eligible for the PMKSY Government Scheme which gives huge subsidies for farming equipment! 💰\n\nLet me know if you need any more help, my friend! 😊`;
  }

  setTimeout(() => res.json({ response }), 600);
});

// Water Health Prediction (Vertex AI Stub)
router.get('/water-health', (req, res) => {
  // This is where Vertex AI prediction would happen
  res.json({ score: 85, risk: 'Low', prediction: 'Normal rainfall expected.' });
});

module.exports = router;
