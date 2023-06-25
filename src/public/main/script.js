const chat = require('../../schemas/chatSchema');
const search = document.getElementById('search')
const searchButton = document.getElementById('search-button')
const noDataContainer = document.getElementById('no-data-container')

// let data = true
let data = chat.find()
    .then((users) => {
        console.log('All users:', users);
    })
    .catch((error) => {
        console.error('Error finding users:', error);
    });

if (!data) {
    // noDataContainer.style.display = 'block'
    // noDataContainer.style.display = 'inline'
} else {
    noDataContainer.style.display = 'none'
}

searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    if (!search.value) return;

    let newMessage = new chat({
        user: true,
        message: search.value
    });
    newMessage.save()
})