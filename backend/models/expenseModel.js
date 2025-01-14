const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({    
    date: {
        type: Date,
        default: Date.now,
        required: true,    
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
});

const Expense = new mongoose.model('Expense', expenseSchema); // Mongoose uses the plural, lowercased version of the model which is 'expenses'
module.exports = Expense;