// backend/controllers/ambulanceController.js
const Ambulance = require('../models/Ambulance');

// nearest available ambulance distil
exports.dispatchAmbulance = async (req, res) => {
    const { lat, lng } = req.body;

    const ambulance = await Ambulance.findOne({
        available: true,
        location: {
            $near: {
                $geometry: { type: 'Point', coordinates: [lng, lat] },
                $maxDistance: 10000 // 10km
            }
        }
    });

    if (!ambulance) return res.status(404).json({ message: 'No ambulances available nearby' });

    ambulance.available = false;
    await ambulance.save();

    res.status(200).json({ message: 'Ambulance dispatched', ambulance });
};
