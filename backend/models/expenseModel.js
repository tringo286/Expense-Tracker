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

const Expense = new mongoose.model('Expense', expenseSchema);
module.exports = Expense;