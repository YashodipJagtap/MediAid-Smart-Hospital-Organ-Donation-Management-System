const mongoose = require('mongoose');

const organSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    bloodType: { type: String, required: true },
    organType: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    availability: { type: Boolean, default: true }
});

const Organ = mongoose.model('Organ', organSchema);
module.exports = Organ;
