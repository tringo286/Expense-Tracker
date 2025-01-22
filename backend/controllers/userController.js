const mongoose = require('mongoose');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {        
        const users = await User.find({});
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log("Error in fetching expenses: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

module.exports = { getAllUsers };