const Organ = require('../models/organModel');

const getAllOrgans = async (req, res) => {
    try {
        const organs = await Organ.find().populate('hospital');
        res.status(200).json(organs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching organs' });
    }
};

const addOrgan = async (req, res) => {
    const { donorName, bloodType, organType, hospital } = req.body;
    try {
        const newOrgan = new Organ({
            donorName,
            bloodType,
            organType,
            hospital,
        });
        await newOrgan.save();
        res.status(201).json(newOrgan);
    } catch (err) {
        res.status(500).json({ message: 'Error adding organ' });
    }
};

module.exports = { getAllOrgans, addOrgan };
