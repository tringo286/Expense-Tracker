const express = require('express');
const router = express.Router();

const { handleSignup } = require('../controllers/auth/signupController')
const { handleLogin } = require('../controllers/auth/loginController')
const { handleLogout } = require('../controllers/auth/logoutController')
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController')
const { handleRefreshToken } = require('../controllers/auth/refreshTokenController')

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);
router.get('/users', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;