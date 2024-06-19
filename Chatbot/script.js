$(document).ready(function() {
    var apiKey = '';
    var chatBox = $('#chat-box');

    function sendMessage(message) {
        chatBox.append('<div class="user-message">' + message + '</div>');
        scrollToBottom();
        getChatGPTResponse(message);
    }

    function getChatGPTResponse(message) {
        $.ajax({
            url: 'https://api.openai.com/v1/chat/completions',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            data: JSON.stringify({
                "model": "text-davinci-003",
                "messages": [
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            }),
            success: function(response) {
                var chatGPTResponse = response.choices[0].message.content;
                chatBox.append('<div class="chatgpt-message">' + chatGPTResponse + '</div>');
                scrollToBottom();
            },
            error: function(error) {
                console.error('Error:', error);
                chatBox.append('<div class="chatgpt-message">Sorry, an error occurred. Please try again later.</div>');
                scrollToBottom();
            }
        });
    }

    function scrollToBottom() {
        chatBox.scrollTop(chatBox.prop('scrollHeight'));
    }

    $('#send-btn').click(function() {
        var userInput = $('#user-input').val().trim();
        if (userInput !== '') {
            sendMessage(userInput);
            $('#user-input').val('');
        }
    });

    $('#user-input').keypress(function(e) {
        if (e.which === 13) {
            $('#send-btn').click();
        }
    });
    const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

const CHATGPT_API_KEY = '';
const CHATGPT_API_URL = 'https://api.openai.com/v1/completions';

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post(CHATGPT_API_URL, {
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const { choices } = response.data;
        const chatbotResponse = choices[0].text.trim();
        res.json({ message: chatbotResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Chatbot backend listening at http://localhost:${port}`);
});

});
