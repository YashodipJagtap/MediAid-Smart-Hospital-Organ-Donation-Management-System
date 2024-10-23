document.addEventListener('DOMContentLoaded', () => {
    // Hospital data moved to frontend
    const hospitals = [
        { name: 'City Hospital', location: 'Downtown', specialties: ['accident', 'heart-attack'] },
        { name: 'Green Valley Hospital', location: 'Suburb', specialties: ['fire', 'other'] },
        { name: 'Metro General', location: 'Midtown', specialties: ['accident', 'heart-attack', 'fire'] }
    ];

    // Function to get a hospital based on emergency type
    function getHospitalByEmergencyType(emergencyType) {
        return hospitals.find(hospital => hospital.specialties.includes(emergencyType)) || hospitals[0];
    }

    const ambulanceForm = document.getElementById('ambulanceForm');
    const responseMessage = document.getElementById('responseMessage');

    ambulanceForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            emergencyType: document.getElementById('emergencyType').value,
            additionalInfo: document.getElementById('additionalInfo').value
        };

        // Determine the hospital based on the emergency type
        const assignedHospital = getHospitalByEmergencyType(formData.emergencyType);
        formData.hospital = assignedHospital.name;

        // Send data to the server
        fetch('/api/request-ambulance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    responseMessage.innerHTML = `<p>Ambulance is on the way! The ${formData.hospital} will be dispatching it.</p>`;

                    // Auto-refresh the page after 5 seconds
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000); // 5 seconds delay
                } else {
                    responseMessage.innerHTML = `<p>There was an error processing your request.</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                responseMessage.innerHTML = `<p>There was an error submitting your request.</p>`;
            });
    });
});
