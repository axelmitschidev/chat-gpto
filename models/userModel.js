const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, 'Photo'],
    },
    nom: {
        type: String,
        required: [true, 'Nom'],
    },
    nom: {
        type: String,
        required: [true, 'password'],
    },
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel