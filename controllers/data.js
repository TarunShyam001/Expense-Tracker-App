const Expense = require('../model/expense');

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
  .then(expenses => {
    res.render('expenses-details/expenses-lists', {
      expenses: expenses,
      pageTitle: 'All Expenses',
      path: '/expenses'
    });
  })
  .catch( err => {
    console.log(err);
  });
};

exports.getExpense = (req, res, next) => {
  const expId = req.params.expenseId;
  Expense.findByPk(expId)
  .then(expense => {
    res.render('expenses-details/expense-details', {
        expense : expense,
        pageTitle : expense.title,
        path : '/expenses'
    });
  })
  .catch(err => console.log(err));
};

exports.getHome = (req, res, next) => {
  Expense.findAll()
  .then(expenses => {
    res.render('expenses-details/home', {
        pageTitle: 'Home',
        path: '/'
    });
  })
  .catch( err => {
    console.log(err);
  });;
};
