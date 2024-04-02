// Get the courses container and total price element
const coursesContainer = document.querySelector('.courses-container');
const totalPriceElement = document.querySelector('#total-price');

// Initialize total price
let totalPrice = 0;

// Function to create a course card
function createCourseCard(course) {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', updateTotalPrice);

    const title = document.createElement('h2');
    title.textContent = course.title;

    const price = document.createElement('p');
    price.textContent = course.price;

    courseCard.appendChild(checkbox);
    courseCard.appendChild(title);
    courseCard.appendChild(price);

    return courseCard;
}

// Fetch course data from the JSON file
fetch('../../../Frontend/Static/json/course.json')
    .then(response => response.json())
    .then(courseData => {
        // Render course cards
        courseData.forEach(course => {
            const courseCard = createCourseCard(course);
            coursesContainer.appendChild(courseCard);
        });

        // Add "Select All" checkbox
        const selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.type = 'checkbox';
        selectAllCheckbox.id = 'select-all';
        selectAllCheckbox.addEventListener('change', toggleSelectAll);

        const selectAllLabel = document.createElement('label');
        selectAllLabel.textContent = 'Select All';
        selectAllLabel.htmlFor = 'select-all';

        coursesContainer.appendChild(selectAllCheckbox);
        coursesContainer.appendChild(selectAllLabel);
    })
    .catch(error => console.error('Error fetching course data:', error));

// Function to update the total price
function updateTotalPrice() {
    const checkboxes = document.querySelectorAll('.course-card input[type="checkbox"]');
    totalPrice = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = checkbox.parentElement.querySelector('p').textContent.replace('₹', '');
            totalPrice += parseFloat(price);
        }
    });

    totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
}

// Function to toggle "Select All" checkbox
function toggleSelectAll() {
    const selectAllCheckbox = document.querySelector('#select-all');
    const courseCheckboxes = document.querySelectorAll('.course-card input[type="checkbox"]');

    courseCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });

    updateTotalPrice();
}

// Get the "Enroll" button
const enrollButton = document.querySelector('.cta-button');
enrollButton.addEventListener('click', openPaymentPage);

// Function to open the payment page
function openPaymentPage() {
    const paymentPageUrl = '../../../pages/paymentpage.html';
    const paymentPageParams = `?totalPrice=${totalPrice.toFixed(2)}`;
    const paymentPageFullUrl = paymentPageUrl + paymentPageParams;

    window.open(paymentPageFullUrl, '_blank');
}