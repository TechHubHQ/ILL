
document.addEventListener('DOMContentLoaded', function() {
    const LoginForm = document.getElementById('login-form');

    if (LoginForm) {
        LoginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = new FormData(LoginForm);

            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data.message);

            if (data.message === 'Login successful') {
                window.location.href = '/home';
            }
        });
    }
    else {
        console.error('Login Form Not found')
    }
});

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

