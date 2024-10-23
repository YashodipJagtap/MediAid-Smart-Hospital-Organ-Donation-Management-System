const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contactNumber: { type: String, required: true },
    organBank: { type: Boolean, default: false },
    doctors: [{ type: String }],
    services: [{ type: String }],  // New field for services offered
});

module.exports = mongoose.model('Hospital', hospitalSchema);
