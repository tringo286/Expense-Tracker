const User = require('../../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            errors: {
                email: email ? "" : "Please enter your email",
                password: password ? "" : "Please enter a password"
            }
        });
    }  

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(401).json({
            success: false,
            errors: {   
                email: "Email is not registered",                
            }
        });
    }   

    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchPassword) {
        return res.status(401).json({
            success: false,
            errors: {                
                password: "Incorrect password"
            }
        });
    }   

    try {
        const user = await User.login(email, password)        

        // Access token for short time to authenticate user for API access
        const accessToken = jwt.sign({ email }, "my secret key", { expiresIn: '10s' });

        // Refresh token for long time to obtain a new access token 
        const refreshToken = jwt.sign({ email }, "my secret key", { expiresIn: '1d' });
            
        // Save refresh token with current user
        user.refreshToken = refreshToken;
        await user.save();

        // Create secure cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({
            success: true,
            user: {
                fullName: foundUser.fullName,  
                email: foundUser.email,
                userId: foundUser._id
            },
            accessToken
        });             
    } catch (error) {              
        res.status(400).json({ success: false, errors: error});
    }   
};

module.exports = { handleLogin };