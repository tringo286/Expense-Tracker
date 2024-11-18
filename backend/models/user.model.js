const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,  
        lowercase: true,       
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
    }
});

userSchema.pre('save', async function(next) {
    const salt = bcrypt.genSalt();
    const password = await bcrypt.hash(this.password, salt);
});

const User = new mongoose.model('user', userSchema);

module.exports = User;