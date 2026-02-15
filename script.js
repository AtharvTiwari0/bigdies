// script.js

// Smooth scrolling functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation
function validateForm() {
    const form = document.getElementById('myForm');
    const input = form.querySelector('input[type="text"]');
    if (input.value === '') {
        alert('Input cannot be empty!');
        return false;
    }
    return true;
}

// Success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = 'Form submitted successfully!';
    message.style.color = 'green';
    document.body.appendChild(message);
}

// Example of interacting with a feature
document.getElementById('submitButton').addEventListener('click', function() {
    if (validateForm()) {
        showSuccessMessage();
    }
});