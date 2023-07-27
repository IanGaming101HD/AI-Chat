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
    Array.from(div.children).forEach((child) => child.hidden = false)
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

let user = true

questionInput.addEventListener('click', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        submitButton.click()
      }
})
submitButton.addEventListener('click', (event) => {
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


    // <div class='user-message message'>Hi</div>
    // <div class='bot-message message'>Hello</div>

    let dataContainer = document.getElementById('data-container')
    let newMessage = document.createElement('div')
    dataContainer.appendChild(newMessage)
    newMessage.classList.add('message')
    user ? newMessage.classList.add('user-message') : newMessage.classList.add('bot-message')
    user = !user
    newMessage.innerText = questionInput.value

    questionInput.value = ''

    // let newMessage = new chat({
    //     user: true,
    //     message: search.value
    // });
    // newMessage.save()
})
