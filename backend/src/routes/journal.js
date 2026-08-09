const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Journal = require('../models/Journal');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware to authenticate
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create a new journal entry
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { water, cropHealth, notes } = req.body;
    const entry = await Journal.create({
      user: req.user.id,
      water,
      cropHealth,
      notes
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
});

// Get user's journal entries
router.get('/', authMiddleware, async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

module.exports = router;
