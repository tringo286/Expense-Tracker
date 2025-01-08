const express = require('express');
const router = express.Router();

const { getSignup, postSignup, getLogin, postLogin, handleLogout, checkCookiesAfterLogout } = require('../controllers/auth/authController');
const { handleRefreshToken } = require('../controllers/auth/refreshTokenController')

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);

module.exports = router;