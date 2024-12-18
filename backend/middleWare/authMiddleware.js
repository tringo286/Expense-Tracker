const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, "my secret key", (err, decodedToken) => {
            if(err) {
                res.status(401).json({ redirect: '/login', message: 'Authentication failed' });
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ redirect: '/login', message: 'No token provided' });
    }
};

module.exports = { requireAuth };

