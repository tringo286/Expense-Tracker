const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({  
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }, 
    date: {
        type: Date,        
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

const Income = new mongoose.model('Income', incomeSchema); //Mongoose uses the plural, lowercased version of the mode which is 'incomes' 
module.exports = Income;