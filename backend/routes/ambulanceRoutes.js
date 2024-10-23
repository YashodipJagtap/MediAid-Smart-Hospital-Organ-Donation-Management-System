const express = require('express');
const router = express.Router();

// Request an ambulance
router.post('/request', (req, res) => {
    console.log(req.body.message);
    res.status(200).send('Ambulance requested.');
});

module.exports = router;
