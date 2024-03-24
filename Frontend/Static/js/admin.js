// Add event listeners for navigation links
document.getElementById('dashboard-link').addEventListener('click', function () {
    displayDashboard();
});

document.getElementById('courses-link').addEventListener('click', function () {
    displayCourses();
});

document.getElementById('students-link').addEventListener('click', function () {
    displayStudents();
});

document.getElementById('instructors-link').addEventListener('click', function () {
    displayInstructors();
});

document.getElementById('settings-link').addEventListener('click', function () {
    displaySettings();
});

// Add event listeners for sidebar links
document.getElementById('create-course-link').addEventListener('click', function () {
    createCourse();
});

document.getElementById('manage-courses-link').addEventListener('click', function () {
    manageCourses();
});

document.getElementById('add-student-link').addEventListener('click', function () {
    addStudent();
});

document.getElementById('manage-students-link').addEventListener('click', function () {
    manageStudents();
});

document.getElementById('add-instructor-link').addEventListener('click', function () {
    addInstructor();
});

document.getElementById('manage-instructors-link').addEventListener('click', function () {
    manageInstructors();
});

// Functions to display different sections of the admin portal
function displayDashboard() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Dashboard</h2>';
}

function displayCourses() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Courses</h2>';
}

function displayStudents() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Students</h2>';
}

function displayInstructors() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Instructors</h2>';
}

function displaySettings() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Settings</h2>';
}

// Functions to handle sidebar actions
function createCourse() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Create Course</h2><label for="course-name">Course Name:</label><input type="text" id="course-name" name="course-name" required><br><br><label for="course-code">Course Code:</label><input type="text" id="course-code" name="course-code" required><br><br><label for="course-description">Course Description:</label><br><textarea id="course-description" name="course-description" rows="4" required></textarea><br><br><button type="submit">Create Course</button> <button type="button" id="cancel-button">Cancel</button>';
}

function manageCourses() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Create Course</h2><label for="course-name">Course Name:</label><input type="text" id="course-name" name="course-name" required><br><br><label for="course-code">Course Code:</label><input type="text" id="course-code" name="course-code" required><br><br><br><button type="submit">Delete Course</button> <button type="button" id="cancel-button">Cancel</button>'
}

function addStudent() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Add Student</h2>';
}

function manageStudents() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Add Student</h2><label for="student-name">Name:</label><input type="text" id="student-name" name="student-name" required><br><br><label for="student-email">Email:</label><input type="email" id="student-email" name="student-email" required><br><br><label for="student-age">Student-ID</label><input type="text" id="student-age" name="student-age" required><br><br><button type="submit">Remove Student</button>';
}

function addInstructor() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Add Instructor</h2><label for="instructor-name">Name:</label><input type="text" id="student-name" name="student-name" required><br><br><label for="student-email">Email:</label><input type="email" id="student-email" name="instructor-email" required><br><br><label for="student-age">Instructor-ID</label><input type="text" id="student-age" name="student-age" required><br><br><button type="submit">Add Instructor</button>';
}

function manageInstructors() {
    clearMainContent();
    document.querySelector('.main-content').innerHTML = '<h2>Add Instructor</h2><label for="instructor-name">Name:</label><input type="text" id="student-name" name="student-name" required><br><br><label for="student-email">Email:</label><input type="email" id="student-email" name="instructor-email" required><br><br><label for="student-age">Instructor-ID</label><input type="text" id="student-age" name="student-age" required><br><br><button type="submit">Remove Instructor</button>';
}

function clearMainContent() {
    document.querySelector('.main-content').innerHTML = '';
}

// JavaScript code here
document.getElementById('add-student-link').addEventListener('click', function(event) {
    event.preventDefault();
    displayAddStudentForm();
});

function displayAddStudentForm() {
    // Clear main content
    document.querySelector('.main-content').innerHTML = '';

    // Create and append the form elements
    const form = document.createElement('form');
    form.innerHTML = `
        <h2>Add Student</h2>
        <label for="student-name">Name:</label>
        <input type="text" id="student-name" name="student-name" required><br><br>
        <label for="student-email">Email:</label>
        <input type="email" id="student-email" name="student-email" required><br><br>
        <label for="student-age">Age:</label>
        <input type="text" id="student-age" name="student-age" required><br><br>
        <button type="submit">Add Student</button>
    `;

    // Add form submit event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Get input values
        const name = document.getElementById('student-name').value;
        const email = document.getElementById('student-email').value;
        const age = document.getElementById('student-age').value;

        // Here you can perform further actions, like sending the data to the server or displaying a success message
        console.log('Student details:', name, email, age);
    });

    document.querySelector('.main-content').appendChild(form);
}

