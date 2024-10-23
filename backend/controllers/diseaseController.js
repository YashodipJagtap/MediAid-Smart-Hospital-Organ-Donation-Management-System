// backend/controllers/diseaseController.js
const Disease = require('../models/Disease');

// Predict disease by symptoms
exports.predictDisease = async (req, res) => {
    const { symptoms } = req.body;
    const diseases = await Disease.find({
        symptoms: { $all: symptoms }
    });
    res.status(200).json(diseases);
};

// Add disease with remedies
exports.addDisease = async (req, res) => {
    const { name, symptoms, firstAid, homeRemedies } = req.body;
    const disease = new Disease({
        name,
        symptoms,
        firstAid,
        homeRemedies
    });
    await disease.save();
    res.status(201).json({ message: 'Disease added', disease });
};

// Get first aid and home remedies for a disease
exports.getRemedies = async (req, res) => {
    const { name } = req.params;
    const disease = await Disease.findOne({ name });
    if (!disease) return res.status(404).json({ message: 'Disease not found' });
    res.status(200).json({ firstAid: disease.firstAid, homeRemedies: disease.homeRemedies });
};
