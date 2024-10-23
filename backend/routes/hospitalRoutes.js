const express = require('express');
const Hospital = require('../models/hospital');
const router = express.Router();

// Get all hospitals
router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.find({});
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Find nearby hospitals
router.get('/nearby', async (req, res) => {
    const { location } = req.query;
    try {
        const hospitals = await Hospital.find({ location: new RegExp(location, 'i') });
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create new hospital
router.post('/', async (req, res) => {
    const { name, location, contactNumber, organBank, doctors, services } = req.body;
    const hospital = new Hospital({ name, location, contactNumber, organBank, doctors, services });

    try {
        const createdHospital = await hospital.save();
        res.status(201).json(createdHospital);
    } catch (error) {
        res.status(400).json({ message: 'Invalid hospital data' });
    }
});

// Other CRUD operations...

module.exports = router;
