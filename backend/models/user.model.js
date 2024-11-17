const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,         
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

const User = new mongoose.model('user', userSchema);

module.exports = User;