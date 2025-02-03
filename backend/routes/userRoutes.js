const express = require('express');
const router = express.Router();

const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController')

router.get('/users', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;