const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-expense', adminController.getAddExpense);

// /admin/products => GET
router.get('/expenses', adminController.getExpenses);

// /admin/add-product => POST
router.post('/add-expense', adminController.postAddExpense);

router.get('/edit-expense/:expenseId', adminController.getEditExpense);

router.post('/edit-expense', adminController.postEditExpense);

router.post('/delete-expense', adminController.postDeleteExpense);

module.exports = router;
