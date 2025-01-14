const express = require('express');
const router = express.Router();

const { getAllIncomes, createIncome, updateIncome, deleteIncome } = require('../controllers/incomeController')

router.get('/incomes', getAllIncomes);
router.post('/income', createIncome);
router.put('/income/:id', updateIncome)
router.delete('/income/:id', deleteIncome)

module.exports = router;