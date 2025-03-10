const mongoose = require('mongoose')
const Income = require('../models/incomeModel')

const getAllIncomes = async (req, res) => {
    try {
        const { currentUserId } = req.query;        
        const filter = currentUserId ? { userId: currentUserId } : {};
        const incomes = await Income.find(filter);         
        res.status(200).json({ success: true, data: incomes })
    } catch (error) {
        console.log("Error in fetching incomes: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"}) // Internal Server Error
    }
};

const createIncome = async (req, res) => {   
    const income = req.body;
    
    if (!income.incomeCategory || !income.incomeAmount || !income.incomeDate) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }   

    if (isNaN(income.incomeAmount)) {
        return res.status(400).json({
            success: false,
            message: "Amount must be a number"
        });
    }

    const newIncome = new Income(income);

    try {
        await newIncome.save();
        res.status(201).json({ success: true, data: newIncome})
    } catch (error) {
        console.error("Error in create income: ", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }   
};

const updateIncome = async (req, res) => {
    const { id } = req.params;
    const income = req.body;    

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Income Id" });
    }    

    try {
        const updatedIncome = await Income.findByIdAndUpdate(id, income, { new: true });
        res.status(200).json({ success: true, data: updatedIncome });
    } catch (error) {
        console.error("Error in update income: ", error.message);
        res.status(500).json({ success: false, messagge: "Server Error"});
    }
}

const deleteIncome = async (req, res) => {
    const { id }  = req.params;
     
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Income Id"});
    }
    
    try {
        await Income.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Income successfully deleted"})
    } catch (error) {
        console.error("Error in delete income: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
}

module.exports = { getAllIncomes, createIncome, updateIncome, deleteIncome };