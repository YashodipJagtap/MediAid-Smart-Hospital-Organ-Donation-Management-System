const express = require('express');
const { getAllOrgans, addOrgan } = require('../controllers/organController');
const router = express.Router();

router.get('/', getAllOrgans);
router.post('/add', addOrgan);

module.exports = router;
