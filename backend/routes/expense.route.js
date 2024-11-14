const express = require('express');
const router = express.Router();

const { getExpense, createExpense, updateExpense, deleteExpense } = require('../controllers/expense.controller')

router.get('/', getExpense);
router.post('/', createExpense);
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

module.exports = router;