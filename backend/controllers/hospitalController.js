const Hospital = require('../models/hospital');

// Get all hospitals
const getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find({});
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new hospital
const createHospital = async (req, res) => {
    const { name, location, contactNumber, organBank, doctors } = req.body;
    const hospital = new Hospital({
        name,
        location,
        contactNumber,
        organBank,
        doctors,
    });

    try {
        const createdHospital = await hospital.save();
        res.status(201).json(createdHospital);
    } catch (error) {
        res.status(400).json({ message: 'Invalid hospital data' });
    }
};

// Get a hospital by ID
const getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (hospital) {
            res.json(hospital);
        } else {
            res.status(404).json({ message: 'Hospital not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a hospital
const updateHospital = async (req, res) => {
    const { name, location, contactNumber, organBank, doctors } = req.body;

    try {
        const hospital = await Hospital.findById(req.params.id);

        if (hospital) {
            hospital.name = name;
            hospital.location = location;
            hospital.contactNumber = contactNumber;
            hospital.organBank = organBank;
            hospital.doctors = doctors;

            const updatedHospital = await hospital.save();
            res.json(updatedHospital);
        } else {
            res.status(404).json({ message: 'Hospital not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a hospital
const deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);

        if (hospital) {
            await hospital.remove();
            res.json({ message: 'Hospital removed' });
        } else {
            res.status(404).json({ message: 'Hospital not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Hospital login
const hospitalLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Mockup authentication process, you should replace this with actual user authentication logic
        const hospital = await Hospital.findOne({ email });

        if (hospital && hospital.password === password) {
            res.status(200).json({ message: 'Login successful', hospital });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get nearby hospitals based on location
const nearbyHospitals = async (req, res) => {
    const { latitude, longitude } = req.query;

    try {
        // This is a mockup logic to find nearby hospitals based on distance
        // You would need to replace this with actual geolocation-based search logic
        const hospitals = await Hospital.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 5000, // 5 km radius
                },
            },
        });

        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getHospitals,
    createHospital,
    getHospitalById,
    updateHospital,
    deleteHospital,
    hospitalLogin,
    nearbyHospitals,
};
