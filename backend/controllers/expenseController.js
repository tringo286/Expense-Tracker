const mongoose = require('mongoose')
const Expense = require('../models/expenseModel')

const getAllExpenses = async (req, res) => {
    try {
        const { currentUserId } = req.query;  
        const filter = currentUserId ? { userId: currentUserId } : {};   
        const expenses = await Expense.find(filter);
        res.status(200).json({ success: true, data: expenses })
    } catch (error) {
        console.log("Error in fetching expenses: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

const createExpense = async (req, res) => {    
    const expense = req.body;
    
    if (!expense.expenseCategory || !expense.expenseDescription || !expense.expenseAmount || !expense.expenseDate) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }   

    const newExpense = new Expense(expense);

    try {
        await newExpense.save();
        res.status(201).json({ success: true, data: newExpense})
    } catch (error) {
        console.error("Error in create expense: ", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }   
}

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const expense = req.body;    

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Expense Id" });
    }    

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, expense, { new: true });
        res.status(200).json({ success: true, date: updatedExpense });
    } catch (error) {
        console.error("Error in update expense: ", error.message);
        res.status(500).json({ success: false, messagge: "Server Error"});
    }
}

const deleteExpense = async (req, res) => {
    const { id }  = req.params;
     
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Expense Id"});
    }
    
    try {
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Expense successfully deleted"})
    } catch (error) {
        console.error("Error in delete expense: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
}

module.exports = { getAllExpenses, createExpense, updateExpense, deleteExpense };