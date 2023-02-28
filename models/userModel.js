const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'nom'],
    },
    prenom: {
        type: String,
        required: [true, 'prenom'],
    },
    password: {
        type: String,
        required: [true, 'password'],
    }
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel