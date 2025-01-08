const express = require('express');
const router = express.Router();

const { getSignup, postSignup, getLogin, postLogin } = require('../controllers//auth/auth.controller');
const { handleRefreshToken } = require('../controllers//auth/refreshToken.controller')

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/refresh', handleRefreshToken);

module.exports = router;