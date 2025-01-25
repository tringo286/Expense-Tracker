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

const updateUser = async (req, res) => {
    const user = req.body;
    const { id } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser })
    } catch (err) {
        console.log("Error in update user: ", err.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

const deleteUser = async (req, res) => {
    const { id }  = req.params;
     
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid User Id"});
    }
    
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User successfully deleted"})
    } catch (error) {
        console.error("Error in delete user: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

module.exports = { getAllUsers, updateUser, deleteUser };