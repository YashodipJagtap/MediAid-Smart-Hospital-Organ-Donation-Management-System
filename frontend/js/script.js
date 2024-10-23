// JavaScript for finding nearby hospitals

document.addEventListener('DOMContentLoaded', function () {
    const getLocationButton = document.getElementById('getLocation');
    const hospitalList = document.getElementById('hospitalList');

    if (getLocationButton) {
        getLocationButton.addEventListener('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    fetch(`/hospitals?latitude=${latitude}&longitude=${longitude}`)
                        .then(response => response.json())
                        .then(data => {
                            hospitalList.innerHTML = '';
                            if (data.length > 0) {
                                data.forEach(hospital => {
                                    const div = document.createElement('div');
                                    div.className = 'hospital';
                                    div.innerHTML = `<strong>${hospital.name}</strong> - ${hospital.distance.toFixed(2)} km away`;
                                    hospitalList.appendChild(div);
                                });
                            } else {
                                hospitalList.innerHTML = '<p>No hospitals found within 10 km.</p>';
                            }
                        })
                        .catch(error => console.error('Error:', error));
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        });
    }
});
