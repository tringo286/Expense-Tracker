const { model } = require('mongoose');
const User = require('../models/user.model');

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
        res.status(400).json({ success: false, message: error.message});
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

