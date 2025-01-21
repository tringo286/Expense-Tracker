const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({    
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    expenseDate: {
        type: Date,
        default: Date.now,
        required: true,    
    },
    expenseCategory: {
        type: String,
        required: true
    },
    expenseDescription: {
        type: String,
        required: true,
    },
    expenseAmount: {
        type: Number,
        required: true
    }
});

const Expense = new mongoose.model('Expense', expenseSchema); // Mongoose uses the plural, lowercased version of the model which is 'expenses'
module.exports = Expense;