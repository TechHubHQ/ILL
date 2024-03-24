// support.js

document.addEventListener('DOMContentLoaded', function() {
    const chatBtn = document.getElementById('live-chat-btn');
    const closeBtn = document.getElementById('close-chat-btn');
    const chatPopup = document.getElementById('live-chat-popup');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');

    // Chat bot responses
    const botResponses = [
        "Hello! How can I assist you today?",
        "Please provide more details about your issue.",
        "Thank you for reaching out! Our support team will assist you shortly.",
        "I'm sorry, but I'm just a bot. For further assistance, please contact our support team -ill@support.com",
        "Have you tried restarting your device?",
        "Could you please try clearing your browser cache?",
        "You can find helpful articles in our knowledge base. Would you like me to provide a link?",
        "Is there anything else I can help you with?"
    ];

    // Show live chat pop-up when live chat button is clicked
    chatBtn.addEventListener('click', function() {
        chatPopup.style.display = 'block';
        appendBotMessage(botResponses[0]);
    });

    // Hide live chat pop-up when close button is clicked
    closeBtn.addEventListener('click', function() {
        chatPopup.style.display = 'none';
    });

    // Send user message
    sendMessageBtn.addEventListener('click', function() {
        const userMessage = userMessageInput.value;
        if (userMessage.trim() !== '') {
            appendUserMessage(userMessage);
            userMessageInput.value = '';
            setTimeout(function() {
                const randomResponseIndex = Math.floor(Math.random() * botResponses.length);
                appendBotMessage(botResponses[randomResponseIndex]);
            }, 1000);
        }
    });

    // Append user message to chat
    function appendUserMessage(message) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user');
        userMessageDiv.textContent = message;
        chatMessages.appendChild(userMessageDiv);
    }

    // Append bot message to chat
    function appendBotMessage(message) {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot');
        botMessageDiv.textContent = message;
        chatMessages.appendChild(botMessageDiv);
    }
});
// Function to clear chat messages
function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
}

// Function to handle closing the chat
function handleCloseChat() {
    clearChat();
}

// Add event listener to handle closing the chat
document.getElementById('close-chat-btn').addEventListener('click', handleCloseChat);
// Example JavaScript code to render messages with avatars
function renderMessage(message) {
    const chatMessages = document.getElementById('chat-messages');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');

    const avatarImg = document.createElement('img');
    avatarImg.src = message.avatarUrl('../../../public/images/chatbot.jpg'); 
    avatarImg.alt = 'Avatar';
    avatarImg.classList.add('avatar');
    messageDiv.appendChild(avatarImg);

    const messageText = document.createElement('div');
    messageText.classList.add('message');
    messageText.textContent = message.text;
    messageDiv.appendChild(messageText);
    chatMessages.appendChild(messageDiv);
}
