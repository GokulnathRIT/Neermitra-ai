const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'neermitra_secret_key';

// Mock in-memory user store with a persistent Test User
const users = [
  {
    uid: 'user_test',
    name: 'NeerMitra Judge',
    email: 'test@neermitra.com',
    password: bcrypt.hashSync('test123', 10),
    role: 'farmer',
    village: 'Sample Village',
    district: 'Sample District',
    state: 'Maharashtra',
    subscription: 'premium',
    waterPointsEarned: 2500,
    badgesEarned: ['Water Guardian', 'Eco Farmer'],
    createdAt: new Date(),
  }
];

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', async (req, res) => {
  const { name, email, password, role, village, district, state } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ error: 'User already exists.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    uid: `user_${Date.now()}`,
    name, email,
    password: hashedPassword,
    role: role || 'farmer',
    village: village || '',
    district: district || '',
    state: state || '',
    subscription: 'free',
    waterPointsEarned: 0,
    badgesEarned: [],
    createdAt: new Date(),
  };

  users.push(newUser);

  const token = jwt.sign({ uid: newUser.uid, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({ message: 'User registered successfully!', token, user: { uid: newUser.uid, name, email, role: newUser.role } });
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

  const token = jwt.sign({ uid: user.uid, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ message: 'Login successful!', token, user: { uid: user.uid, name: user.name, email: user.email, role: user.role } });
});

// @route   GET /api/auth/me
// @desc    Get current user profile
router.get('/me', require('../middlewares/auth'), (req, res) => {
  const user = users.find(u => u.uid === req.user.uid);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

module.exports = router;
