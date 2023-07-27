// const mongoose = require('mongoose');
// const chat = require('../../schemas/chatSchema');
const questionInput = document.getElementById('question-input')
const submitButton = document.getElementById('submit-button')
const noDataContainer = document.getElementById('no-data-container')

function hideEntireDiv(div) {
    div.hidden = true
    Array.from(div.children).forEach((child) => {
        child.hidden = true

        if (child.nodeName === 'I') {
            child.style.display = 'none'
        }
    })
}

function showEntireDiv(div) {
    div.hidden = false
    Array.from(div.children).forEach((child) => {
        child.hidden = false

        if (child.nodeName === 'I') {
            child.style.display = 'inline'
        }
    })
}

let chatContent = localStorage.getItem('chat-content')

if (chatContent) {
    hideEntireDiv(noDataContainer)
    chatContent = JSON.parse(localStorage.getItem('chat-content'))
} else {
    chatContent = []
}

// // let data = true
// let data = chat.find()
//     .then((users) => {
//         console.log('All users:', users);
//     })
//     .catch((error) => {
//         console.error('Error finding users:', error);
//     });

// if (!data) {
//     // noDataContainer.style.display = 'block'
//     // noDataContainer.style.display = 'inline'
// } else {
//     noDataContainer.style.display = 'none'
// }

let userTurn = true

questionInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        submitButton.click()
      }
})

submitButton.addEventListener('click', async (event) => {
    event.preventDefault()
    if (!questionInput.value) return;

    if (noDataContainer.hidden) {
        hideEntireDiv(noDataContainer)
    }

    chatContent.push({
        user: true,
        message: questionInput.value
    })
    localStorage.setItem('chat-content', JSON.stringify(chatContent))

    // let newMessage = new chat({
    //     user: true,
    //     message: search.value
    // });
    // newMessage.save()

    let dataContainer = document.getElementById('data-container')
    let newMessage = document.createElement('div')
    dataContainer.appendChild(newMessage)
    newMessage.classList.add('message')
    userTurn ? newMessage.classList.add('user-message') : newMessage.classList.add('bot-message')
    userTurn = !userTurn
    newMessage.innerText = questionInput.value

    questionInput.value = ''

    // let response = await fetch('http://example.com/movies.json');
    // let movies = await response.json();
    // console.log(movies);
})

const apiKey = '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'; // Replace this with your actual OpenAI API key
const endpoint = 'https://api.openai.com/v1/chat/completions';

async function getChatCompletion(message) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    let data = await response.json();
    let aiReply = data.choices[0].message.content;
    return aiReply
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while processing your request.';
  }
}

// Example usage:
const userMessage = 'Hello, ChatGPT!'; // Replace this with the user's message
getChatCompletion(userMessage).then((response) => {
  console.log('AI Reply:', response);
});