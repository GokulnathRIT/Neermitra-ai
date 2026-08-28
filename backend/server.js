require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// NOTE: webhook route needs raw body — must be before express.json()
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// =====================
// Routes
// =====================
app.use('/api/auth',    authRoutes);
app.use('/api/journal', require('./src/routes/journal'));
app.use('/api/advisor', require('./src/routes/api'));
app.use('/api/reports', require('./src/routes/reports'));
app.use('/api/crops',   require('./src/routes/crops'));
app.use('/api/schemes', require('./src/routes/schemes'));
app.use('/api/impact',  require('./src/routes/impact'));
app.use('/api/payment', require('./src/routes/payment'));
app.use('/api/iot',     require('./src/routes/iot'));

// =====================
// Root - API Overview
// =====================
app.get('/ping', (req, res) => res.send('OK'));

app.get('/', (req, res) => {
  res.json({
    project: 'NeerMitra AI',
    status: 'running ✅',
    version: '1.0.0',
    endpoints: {
      auth:     '/api/auth     → POST /register, POST /login, GET /me',
      advisor:  '/api/advisor  → POST / (AI Chatbot)',
      reports:  '/api/reports  → GET /, POST /, PUT /:id/upvote',
      crops:    '/api/crops    → POST /recommend, GET /water-health',
      schemes:  '/api/schemes  → GET /, GET /:id',
      impact:   '/api/impact   → GET /stats, GET /leaderboard, GET /badges',
      payment:  '/api/payment  → GET /plans, POST /create-order, POST /verify, POST /webhook',
    }
  });
});

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`✅ NeerMitra AI Backend running on port: ${port}`);
  console.log(`📡 API Overview: http://localhost:${port}/`);
});
