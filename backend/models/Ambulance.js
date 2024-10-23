// backend/models/Ambulance.js
const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    location: {
        lat: Number,
        lng: Number
    },
    available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);
