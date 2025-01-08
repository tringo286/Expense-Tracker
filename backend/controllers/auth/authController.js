const User = require('../../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const getSignup = async (req, res) => {
    res.send('User sign up');
};

const getLogin = async (req, res) => {
    res.send('User log in');
};

const postSignup = async (req, res) => {
    const user = req.body;
    const email = user.email;
    
    try {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(user.password, salt);
        const newUser = await User.create({ email, password });    
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
        
        // Access token for short time to authenticate user for API access
        const accessToken = jwt.sign({ email }, "my secret key", { expiresIn: '1h' });

        // Refresh token for long time to obtain a new access token 
        const refreshToken = jwt.sign({ email }, "my secret key", { expiresIn: '1d' });
            
        // Save refresh token with current user
        user.refreshToken = refreshToken;
        await user.save();

        // Create secure cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ success: true, user: email, accessToken });
    } catch (err) {
        const errors = handleErrors(err);         
        res.status(400).json({ success: false, errors: errors});
    }
};

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
    
    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
};

module.exports = { getSignup, getLogin, postSignup, postLogin, handleLogout };