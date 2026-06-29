const express = require('express');
const router = express.Router();

const schemes = [
  {
    id: 'sch_001',
    title: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    description: 'Provides financial assistance for micro-irrigation systems like drip and sprinkler. Covers up to 55% subsidy for small farmers.',
    eligibility: ['All farmers', 'Priority to small and marginal farmers'],
    benefits: 'Up to 55% subsidy on drip/sprinkler irrigation',
    howToApply: 'Apply at your nearest Agriculture Department office or through the PMKSY portal.',
    tags: ['irrigation', 'subsidy', 'all-india'],
    link: 'https://www.myscheme.gov.in/schemes/pmksy',
  },
  {
    id: 'sch_002',
    title: 'Jal Jeevan Mission',
    description: 'Aims to provide safe and adequate drinking water through household tap connections to every rural household by 2024.',
    eligibility: ['Rural households without tap water connection'],
    benefits: 'Free functional tap water connection',
    howToApply: 'Contact your local Gram Panchayat or district water board.',
    tags: ['drinking water', 'rural', 'free'],
    link: 'https://www.myscheme.gov.in/schemes/jjm',
  },
  {
    id: 'sch_003',
    title: 'Atal Bhujal Yojana',
    description: 'Promotes sustainable management of groundwater with active community participation in water-stressed areas.',
    eligibility: ['Residents of water-stressed Gram Panchayats', 'Participating states: Gujarat, Haryana, Karnataka, Rajasthan, UP, MP, Maharashtra'],
    benefits: 'Community water management grants and training',
    howToApply: 'Apply through your Gram Panchayat.',
    tags: ['groundwater', 'community', 'sustainability'],
    link: 'https://www.myscheme.gov.in/schemes/aby',
  },
  {
    id: 'sch_004',
    title: 'PM Kisan Samman Nidhi (PM-KISAN)',
    description: 'Provides income support of ₹6,000/year in three installments of ₹2,000 to all landholding farmer families.',
    eligibility: ['All landholding farmer families with less than 2 hectares of land'],
    benefits: '₹6,000 per year direct bank transfer',
    howToApply: 'Register at pmkisan.gov.in or at nearest Common Service Centre.',
    tags: ['income support', 'all farmers', 'direct benefit'],
    link: 'https://pmkisan.gov.in/',
  },
  {
    id: 'sch_005',
    title: 'Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance scheme that provides financial support to farmers suffering crop loss/damage due to unforeseen events like drought, flood, pest attacks.',
    eligibility: ['All farmers growing notified crops', 'Compulsory for loanee farmers'],
    benefits: 'Crop loss compensation at highly subsidised premiums (1.5%-5%)',
    howToApply: 'Enroll through your bank, insurance company, or Common Service Centre before the cut-off date.',
    tags: ['insurance', 'crop loss', 'drought', 'flood'],
    link: 'https://www.myscheme.gov.in/schemes/pmfby',
  },
];

// @route   GET /api/schemes
// @desc    Get all schemes with optional search
router.get('/', (req, res) => {
  const { search } = req.query;
  if (!search) return res.json({ count: schemes.length, schemes });
  const query = search.toLowerCase();
  const filtered = schemes.filter(s =>
    s.title.toLowerCase().includes(query) ||
    s.description.toLowerCase().includes(query) ||
    s.tags.some(t => t.includes(query))
  );
  res.json({ count: filtered.length, schemes: filtered });
});

// @route   GET /api/schemes/:id
// @desc    Get single scheme details
router.get('/:id', (req, res) => {
  const scheme = schemes.find(s => s.id === req.params.id);
  if (!scheme) return res.status(404).json({ error: 'Scheme not found.' });
  res.json(scheme);
});

module.exports = router;
