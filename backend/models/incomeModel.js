const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({  
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }, 
    incomeDate: {
        type: Date,        
        required: true,    
    },
    incomeCategory: {
        type: String,
        required: true
    },
    incomeDescription: {
        type: String,        
    },
    incomeAmount: {
        type: Number,
        required: true
    }
});

const Income = new mongoose.model('Income', incomeSchema); //Mongoose uses the plural, lowercased version of the mode which is 'incomes' 
module.exports = Income;