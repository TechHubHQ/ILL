async function submitIdea() {
    const ideaInput = document.getElementById('idea').value;

    const formData = new FormData();
    formData.append('idea', ideaInput);

    try {
        const response = await fetch('/api/submit_idea', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to submit idea');
        }

        const data = await response.json();
        console.log(data.message);
        
    } catch (error) {
        console.error('Error submitting idea:', error.message);
    }
}

async function getIdeas() {
    try {
        const response = await fetch('/api/get_ideas');
        const data = await response.json();
        console.log(data);
        
        const ideaFeed = document.querySelector('.idea-feed');
        
        ideaFeed.innerHTML = '';
        
        // Iterate over the received data
        data.forEach((ideaData, index) => {
            const ideaDiv = document.createElement('div');
            ideaDiv.classList.add('idea');
            
            // Extract idea and submission time from the tuple
            const idea = ideaData[0];
            const submittedOn = formatDate(ideaData[1]); // Format the date
            
            // Create paragraphs for idea and submission time
            const ideaPara = document.createElement('p');
            ideaPara.textContent = `Idea: ${idea}`;
            
            const submittedOnPara = document.createElement('p');
            submittedOnPara.textContent = `Submitted On: ${submittedOn}`;
            
            // Append paragraphs to the idea div
            ideaDiv.appendChild(ideaPara);
            ideaDiv.appendChild(submittedOnPara);
            
            // Append idea div to the idea feed
            ideaFeed.appendChild(ideaDiv);
            
            // Add separator line between ideas
            if (index < data.length - 1) {
                const separator = document.createElement('hr');
                ideaFeed.appendChild(separator);
            }
        });
        
        // If no ideas found, display a message
        if (data.length === 0) {
            console.log("No ideas found.");
            const noIdeasPara = document.createElement('p');
            noIdeasPara.textContent = "No ideas found, Please submit an Idea.";
            ideaFeed.appendChild(noIdeasPara);
        }
        
    } catch (error) {
        console.error('Error fetching ideas:', error);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

window.onload = getIdeas;