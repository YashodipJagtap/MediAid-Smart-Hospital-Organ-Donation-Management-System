// JavaScript to load the navbar and footer dynamically

// Load Navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('../partials/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('nav').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Load Footer
document.addEventListener('DOMContentLoaded', function () {
    fetch('../partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
