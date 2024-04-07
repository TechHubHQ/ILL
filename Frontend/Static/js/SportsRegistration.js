document.addEventListener('DOMContentLoaded', function() {
    const SportsForm = document.getElementById('sports_reg');

    if (SportsForm) {
        SportsForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = new FormData(SportsForm);

            const response = await fetch('/api/sports_register', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data.message);

            if (data.message === 'Sports Registration Successful') {
                const successMessage = document.createElement('div');
                successMessage.classList.add("success-message");
                successMessage.textContent = 'Registration Successful';
                document.body.appendChild(successMessage);

                setTimeout(() => {
                    window.location.href = '/landing';
                }, 3000);
            }
        });
    }
    else {
        console.error('Sports Form Not found');
    }
});


function getSports() {
    try {
        const response = fetch('/api/get_sports');
        const sports = response.json();
        console.log(sports);
    }
    catch (error) {
        console.error("Error fetching sports:", error.message);
    }
}