const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Mock leaderboard data
const leaderboard = [
  { rank: 1, village: 'Rampur', district: 'Patna', waterScore: 98, issuesResolved: 12, points: 4800 },
  { rank: 2, village: 'Sitapur', district: 'Vaishali', waterScore: 92, issuesResolved: 8, points: 3900 },
  { rank: 3, village: 'Gopalganj', district: 'Gopalganj', waterScore: 85, issuesResolved: 5, points: 3200 },
  { rank: 4, village: 'Buxar', district: 'Buxar', waterScore: 79, issuesResolved: 3, points: 2800 },
];

const badges = [
  { id: 'water_warrior', name: 'Water Warrior', description: 'Reported 5+ water issues', icon: '💧' },
  { id: 'rain_reader', name: 'Rain Reader', description: 'Checked rainfall forecast 10 times', icon: '🌧️' },
  { id: 'crop_champion', name: 'Crop Champion', description: 'Used the crop planner 3 times', icon: '🌾' },
  { id: 'community_hero', name: 'Community Hero', description: 'Got 50 upvotes on reports', icon: '🏆' },
];

// @route   GET /api/impact/stats
// @desc    Get overall impact statistics
router.get('/stats', (req, res) => {
  res.json({
    farmersEmpowered: 12450,
    litersSaved: 4200000,
    reportsResolved: 874,
    villagesCovered: 230,
    waterChampions: 850,
  });
});

// @route   GET /api/impact/leaderboard
// @desc    Get village leaderboard
router.get('/leaderboard', (req, res) => {
  res.json({ leaderboard });
});

// @route   GET /api/impact/badges
// @desc    Get all available badges
router.get('/badges', (req, res) => {
  res.json({ badges });
});

module.exports = router;
