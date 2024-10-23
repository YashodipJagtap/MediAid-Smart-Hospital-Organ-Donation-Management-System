// backend/routes/diseaseRoutes.js
const express = require('express');
const router = express.Router();
const { predictDisease, addDisease, getRemedies } = require('../controllers/diseaseController');

// Predict disease based on symptoms
router.post('/predict', predictDisease);

// Add new disease
router.post('/add', addDisease);

// Get remedies for a disease
router.get('/remedies/:name', getRemedies);

module.exports = router;
