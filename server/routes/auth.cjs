const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db.cjs');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth.cjs');

const router = express.Router();

// Register a new farmer
router.post('/register', async (req, res) => {
  const { name, phone, password, village } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ error: "Name, phone, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (name, phone, password, village) VALUES (?, ?, ?, ?)`,
      [name, phone, hashedPassword, village || 'Unknown'],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: "Phone number already registered" });
          }
          return res.status(500).json({ error: "Database error" });
        }
        
        const token = jwt.sign({ id: this.lastID, name, phone }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: this.lastID, name, phone, village, points: 0 } });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post('/login', (req, res) => {
  const { phone, password } = req.body;
  
  db.get(`SELECT * FROM users WHERE phone = ?`, [phone], async (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(400).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, name: user.name, phone: user.phone }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, phone: user.phone, village: user.village, points: user.points } });
  });
});

// Get current user profile
router.get('/me', authenticateToken, (req, res) => {
  db.get(`SELECT id, name, phone, village, points FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  });
});

module.exports = router;
