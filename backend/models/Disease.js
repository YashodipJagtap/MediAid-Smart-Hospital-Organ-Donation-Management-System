// backend/models/Disease.js
const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symptoms: [String],
    firstAid: String,
    homeRemedies: String
});

module.exports = mongoose.model('Disease', diseaseSchema);
