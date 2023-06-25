const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    user: {
        type: Boolean,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('chat', chatSchema)