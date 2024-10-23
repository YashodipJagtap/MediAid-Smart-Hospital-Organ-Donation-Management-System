document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('symptomForm');
    const resultDiv = document.getElementById('result');

    // Example data for disease prediction
    const diseasesDatabase = [
        {
            name: "Flu",
            symptoms: ["fever", "cough", "headache", "body pain"],
            remedies: "Drink plenty of fluids, rest, and take pain relievers like ibuprofen.",
            firstAid: "Keep the person hydrated and monitor symptoms."
        },
        {
            name: "COVID-19",
            symptoms: ["fever", "cough", "difficulty breathing", "fatigue"],
            remedies: "Self-isolate, take prescribed medications, rest, and hydrate.",
            firstAid: "Monitor symptoms closely and seek medical help if breathing difficulties arise."
        },
        {
            name: "Common Cold",
            symptoms: ["sore throat", "runny nose", "cough", "sneezing"],
            remedies: "Gargle salt water, rest, drink warm liquids.",
            firstAid: "Encourage fluid intake and rest."
        }
    ];

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Clear previous results
        resultDiv.innerHTML = "";

        const userInput = document.getElementById('symptoms').value.trim().toLowerCase();

        if (!userInput) {
            resultDiv.innerHTML = "<p>Please enter some symptoms.</p>";
            return;
        }

        const userSymptoms = userInput.split(',').map(symptom => symptom.trim());

        let matchedDiseases = [];

        // Find diseases that match the symptoms entered
        diseasesDatabase.forEach(disease => {
            const matchedSymptoms = disease.symptoms.filter(symptom =>
                userSymptoms.includes(symptom.toLowerCase())
            );
            if (matchedSymptoms.length > 0) {
                matchedDiseases.push(disease);
            }
        });

        // Display the matched diseases
        if (matchedDiseases.length > 0) {
            let output = "<h2>Possible Diseases:</h2>";
            matchedDiseases.forEach(disease => {
                output += `<h3>${disease.name}</h3>`;
                output += `<p><strong>Home Remedies:</strong> ${disease.remedies}</p>`;
                output += `<p><strong>First Aid:</strong> ${disease.firstAid}</p>`;
            });
            resultDiv.innerHTML = output;
        } else {
            resultDiv.innerHTML = "<p>No matching diseases found with the entered symptoms.</p>";
        }
    });
});
