const { model } = require('mongoose');
const User = require('../models/user.model');

const errorsHandler = (error) => {
    const errors = { email: "", password: ""};

    if(error.code === 11000) {
        errors.email = "Email is already registerd"
        return errors;
    }

    if(error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(value => {
            errors[value.properties.path] = value.properties.message;
        });
    }

    return errors;
};

const getSignup = async (req, res) => {
    res.send('User sign up');
};

const getLogin = async (req, res) => {
    res.send('User log in');
};

const postSignup = async (req, res) => {
    const user = req.body;
    
    try {
        const newUser = await User.create(user);
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        const errors = errorsHandler(error);
        res.status(400).json({ success: false, message: errors});
    }
}

const postLogin = async (req, res) => {
    const user = req.body;

    try {
        res.status(200).json({ success: true, user: user});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message});
    }
}

module.exports = { getSignup, getLogin, postSignup, postLogin };

