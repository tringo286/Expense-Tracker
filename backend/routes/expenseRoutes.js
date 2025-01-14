const express = require('express');
const router = express.Router();

const { getExpense, createExpense, updateExpense, deleteExpense } = require('../controllers/expenseController')

router.get('/expense', getExpense);
router.post('/expense', createExpense);
router.put('/expense:id', updateExpense)
router.delete('/expense:id', deleteExpense)

module.exports = router;