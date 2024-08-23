const Expense = require('../model/expense');

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
  .then(expenses => {
    res.render('admin/expenses', {
      expenses: expenses,
      pageTitle: 'Admin Expenses',
      path: '/admin/expenses'    
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getAddExpense = (req, res, next) => {
  res.render('admin/edit-expense', {
    pageTitle: 'Add Expense-Details',
    path: '/admin/add-expense',
    editing: false
  });
};

exports.postAddExpense = (req, res, next) => {
  const title = req.body.title;
  const category = req.body.category;
  const amount = req.body.amount;
  const details = req.body.details;
  Expense.create({
    title: title,
    category: category,
    amount: amount,
    details: details
  })
  .then(() => {
    console.log('Added the expenses');
    res.redirect('/admin/expenses');
  })
  .catch(err => {
    console.log(err);
    res.redirect('/admin/expenses');
  })
};

exports.getEditExpense = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const expId = req.params.expenseId;
  Expense.findByPk(expId)
  .then(expense => {
    if(!expense){
      return res.redirect('/');
    }
    res.render('admin/edit-expense', {
      pageTitle: 'Edit Expense-Details',
      path: '/admin/edit-expense',
      editing: editMode,
      expense: expense
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postEditExpense = (req, res, next) => {
  const expId = req.body.expenseId;
  const updatedTitle = req.body.title;
  const updatedCategory = req.body.category;
  const updatedPrice = req.body.amount;
  const updatedDesc = req.body.details;
  Expense.findByPk(expId)
  .then(expense => {
    if (!expense) {
      console.log('Expense not found');
      return res.redirect('/');
    }
    expense.title = updatedTitle;
    expense.category = updatedCategory;  
    expense.amount = updatedPrice;
    expense.details = updatedDesc;
    return expense.save();
  })
  .then(() => {
    console.log('Expense Details Updated')
    res.redirect('/admin/expenses');
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postDeleteExpense = (req, res, next) => {
  const expId = req.body.expenseId;
  Expense.findByPk(expId)
  .then(expense => {
    return expense.destroy();
  })
  .then(() => {
    console.log("Expense Details Deleted")
    res.redirect('/admin/expenses');
  })
  .catch(err => {
    console.log(err);
  });
};