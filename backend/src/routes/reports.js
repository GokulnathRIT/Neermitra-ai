const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// In-memory store for reports (replace with Firestore)
let reports = [
  {
    reportId: 'rep_001',
    userId: 'demo_user',
    category: 'shortage',
    description: 'Village well has dried up completely',
    photoUrl: null,
    location: { lat: 25.5941, lng: 85.1376, village: 'Rampur', district: 'Patna' },
    status: 'pending',
    upvotes: 12,
    createdAt: new Date('2026-06-01'),
  },
  {
    reportId: 'rep_002',
    userId: 'demo_user_2',
    category: 'contamination',
    description: 'Water from tap is brown coloured and smells bad',
    photoUrl: null,
    location: { lat: 25.6040, lng: 85.1000, village: 'Sitapur', district: 'Vaishali' },
    status: 'acknowledged',
    upvotes: 8,
    createdAt: new Date('2026-06-10'),
  }
];

// @route   GET /api/reports
// @desc    Get all reports (public)
router.get('/', (req, res) => {
  const { status, district } = req.query;
  let filtered = [...reports];
  if (status) filtered = filtered.filter(r => r.status === status);
  if (district) filtered = filtered.filter(r => r.location.district === district);
  res.json({ count: filtered.length, reports: filtered });
});

// @route   POST /api/reports
// @desc    Submit a new report (auth required)
router.post('/', auth, (req, res) => {
  const { category, description, location } = req.body;
  if (!category || !description || !location) {
    return res.status(400).json({ error: 'Category, description and location are required.' });
  }
  const newReport = {
    reportId: `rep_${Date.now()}`,
    userId: req.user.uid,
    category,
    description,
    photoUrl: req.body.photoUrl || null,
    location,
    status: 'pending',
    upvotes: 0,
    createdAt: new Date(),
  };
  reports.push(newReport);
  res.status(201).json({ message: 'Report submitted successfully!', report: newReport });
});

// @route   PUT /api/reports/:id/upvote
// @desc    Upvote a report
router.put('/:id/upvote', auth, (req, res) => {
  const report = reports.find(r => r.reportId === req.params.id);
  if (!report) return res.status(404).json({ error: 'Report not found.' });
  report.upvotes += 1;
  res.json({ message: 'Upvoted!', upvotes: report.upvotes });
});

// @route   PUT /api/reports/:id/status
// @desc    Update report status (government/ngo only)
router.put('/:id/status', auth, (req, res) => {
  if (req.user.role === 'farmer') return res.status(403).json({ error: 'Access denied.' });
  const report = reports.find(r => r.reportId === req.params.id);
  if (!report) return res.status(404).json({ error: 'Report not found.' });
  report.status = req.body.status;
  if (req.body.status === 'resolved') report.resolvedAt = new Date();
  res.json({ message: 'Status updated!', report });
});

module.exports = router;
