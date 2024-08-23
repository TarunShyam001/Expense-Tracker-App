const path = require('path');

const express = require('express');

const dataController = require('../controllers/data');

const router = express.Router();

router.get('/', dataController.getHome);

router.get('/expenses', dataController.getExpenses);

router.get('/expenses/:expenseId', dataController.getExpense);

module.exports = router;
