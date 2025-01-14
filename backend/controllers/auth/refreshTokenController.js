const User = require('../../models/userModel')
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized 
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden 

    // Evaluate jwt 
    jwt.verify(refreshToken, "my secret key", (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);   
            const email = foundUser.email;         
            const accessToken = jwt.sign({ email }, "my secret key", { expiresIn: '10s' });
            res.json({ email, accessToken })
        }
    );
};

module.exports = { handleRefreshToken };