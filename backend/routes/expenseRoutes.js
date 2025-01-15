const express = require('express');
const router = express.Router();

const { getAllExpenses, createExpense, updateExpense, deleteExpense } = require('../controllers/expenseController')

router.get('/expenses', getAllExpenses);
router.post('/expense', createExpense);
router.put('/expense/:id', updateExpense)
router.delete('/expense/:id', deleteExpense)

module.exports = router;