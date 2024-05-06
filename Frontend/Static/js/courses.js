// courses.js

// Function to fetch course data from JSON file
async function fetchCourseData() {
    try {
        const response = await fetch('../../../Frontend/Static/json/courses.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching course data:', error);
        return [];
    }
}

// Function to generate HTML for a course card
function generateCourseCard(course) {
    return `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-info">
                <h2 class="course-title">${course.title}</h2>
                <p class="course-description">${course.description}</p>
                <button class="view-course-button" onclick="redirectToYouTube('${course.youtubeLink}')">View Course</button>
            </div>
        </div>
    `;
}

// Function to render courses on the page
async function renderCourses() {
    const coursesContainer = document.querySelector('.courses-container');
    const courses = await fetchCourseData();

    if (!courses || courses.length === 0) {
        coursesContainer.innerHTML = '<p>No courses available</p>';
        return;
    }

    const courseCardsHTML = courses.map(course => generateCourseCard(course)).join('');
    coursesContainer.innerHTML = courseCardsHTML;
}

/// Function to redirect to the /videoplayer route with YouTube link as parameter
function redirectToYouTube(youtubeLink) {
    // Construct the URL with parameters
    const url = `/videoplayer?youtubeLink=${encodeURIComponent(youtubeLink)}`;
    window.location.href = url;
}


// Call renderCourses when the page loads
window.addEventListener('load', renderCourses);
