document.addEventListener('DOMContentLoaded', () => {
    const startChatBtn = document.getElementById('start-chat-btn');
    const quoteBtn = document.getElementById('quote-btn');
    const homeScreen = document.getElementById('home-screen');
    const chatScreen = document.getElementById('chat-screen');
    const quoteDisplay = document.getElementById('quote-display');

    const quotes = [
        "The best thing to hold onto in life is each other.",
        "We are most alive when we're in love.",
        "The simple lack of her is more to me than others' presence.",
        "Love is a two-way street constantly under construction.",
        "To be fully seen by somebody, then, and be loved anyhow—this is a human offering that can border on miraculous."
    ];

    startChatBtn.addEventListener('click', () => {
        homeScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
    });

    quoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = `"${quotes[randomIndex]}"`;
    });

    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText !== '') {
            addMessage(messageText, 'user');
            userInput.value = '';
            setTimeout(() => chatbotResponse(messageText), 500);
        }
    }

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.textContent = text;
        messageElement.classList.add('message', `${sender}-message`);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    let ventMode = false;

    function chatbotResponse(messageText) {
        const lowerCaseMessage = messageText.toLowerCase();
        let botMessage = "I'm not sure how to respond to that. Can you tell me more?";

        if (lowerCaseMessage.includes('vent')) {
            ventMode = true;
            botMessage = "Vent mode activated. I'm here to listen. Feel free to say whatever is on your mind.";
        } else if (ventMode) {
            botMessage = "I hear you. Thanks for sharing.";
        } else if (lowerCaseMessage.includes('breakup')) {
            botMessage = "Breakups are tough. I'm here for you. What's on your mind?";
        } else if (lowerCaseMessage.includes('dating')) {
            botMessage = "Dating can be a rollercoaster. What's been happening?";
        } else if (lowerCaseMessage.includes('fight')) {
            botMessage = "It's normal to have disagreements. Tell me more about what happened.";
        } else if (lowerCaseMessage.includes('communication')) {
            botMessage = "Communication is key. What seems to be the issue?";
        }

        addMessage(botMessage, 'bot');
    }
});
