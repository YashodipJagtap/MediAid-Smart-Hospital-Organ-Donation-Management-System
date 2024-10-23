const express = require('express');
const path = require('path');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files like CSS, JavaScript, and images from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/home.html'));  // Home page path
});

// Route to serve the ambulance request page
app.get('/ambulances', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/ambulances.html'));  // Ambulance request page
});

// API to handle ambulance requests
app.post('/api/request-ambulance', (req, res) => {
    const { name, phone, location, emergencyType, additionalInfo, hospital } = req.body;

    // Process the request (could be saved to a database, for now, just log it)
    console.log('Ambulance Request Received:');
    console.log(`Name: ${name}, Phone: ${phone}, Location: ${location}, Emergency Type: ${emergencyType}`);
    console.log(`Assigned Hospital: ${hospital}`);

    // Send a response back to the client
    res.json({ message: "Ambulance request successfully received", success: true });
});

// Start the server on PORT 3000 or environment PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Disease prediction route
app.post('/predict', (req, res) => {
    const symptoms = req.body.symptoms;
    // Logic to compare symptoms with the database
    Disease.find({ symptoms: { $in: symptoms } })
        .then(diseases => {
            res.json({ diseases });
        })
        .catch(err => {
            res.status(500).send('Error predicting disease');
        });
});
