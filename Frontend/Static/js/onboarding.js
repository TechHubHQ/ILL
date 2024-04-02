document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);

            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data.message);

            if (data.message === 'Registration successful') {
                showSuccessOverlay();
            }
        });
    } else {
        console.error('Registration form not found');
    }
});

function showSuccessOverlay() {
    const overlay = document.querySelector('.success-overlay');
    overlay.classList.add('show');
    
    setTimeout(() => {
        overlay.classList.remove('show');
        window.location.href = '/course_registration';
    }, 3000);
}

function togglePasswordVisibility() {
    var passwordField = document.getElementById('password');
    var passwordToggle = document.querySelector('.password-toggle');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordToggle.innerText = '🔓';
    } else {
        passwordField.type = 'password';
        passwordToggle.innerText = '🔒';
    }
}

function confPassVisibility() {
    var confPass = document.getElementById('confirm-password');
    var confPassToggle = document.querySelector(".conf-password-toggle");

    if (confPass.type === 'password') {
        confPass.type = 'text';
        confPassToggle.innerText = '🔓';
    } else {
        confPass.type = 'password';
        confPassToggle.innerText = '🔒';
    }
}
