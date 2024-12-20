const { model } = require('mongoose');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

const handleErrors = (error) => {
    const errors = { email: "", password: ""};    

    if(error.code === 11000) {
        errors.email = 'Email is already registerd';
        return errors;
    }

    if(error.message === 'incorrect email') {
        errors.email = "Email is not registerd";
    }

    if(error.message === 'incorrect password') {
        errors.password = "Password is incorrect";
    }

    if(error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(value => {
            errors[value.properties.path] = value.properties.message;
        });
    }

    return errors;
};

// create json web token 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "my secret key", { expiresIn: maxAge})
}

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
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        const errors = handleErrors(error);        
        res.status(400).json({ success: false, errors: errors});
    }
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ success: true, user: email});
    } catch (err) {
        const errors = handleErrors(err); 
        res.status(400).json({ success: false, errors: errors});
    }
}

module.exports = { getSignup, getLogin, postSignup, postLogin };

