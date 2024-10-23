// JavaScript to track social media clicks
document.querySelectorAll('.social-links a').forEach(item => {
    item.addEventListener('click', event => {
        let platform = event.target.className.split(' ')[1].replace('fa-', '');
        alert('Redirecting to ' + platform + '...');
    });
});
