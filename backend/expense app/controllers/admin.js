const Expense = require('../models/expence');

exports.getExpence=async (req, res) => {
    try {
      const expenses = await Expense.findAll();
      res.status(200).json(expenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
}

exports.postExpence=async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        const expense = await Expense.create({ amount, description, category });
        res.status(201).json(expense);
    } catch (err) {
        console.error('Error creating expense:', err);
        res.status(500).json({ error: 'Failed to create expense' });
    }
}

exports.deleteExpence=async (req, res) => {
    const expenseId = req.params.expenseId;
    try {
      const expense = await Expense.findByPk(expenseId);
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      await expense.destroy();
      res.status(204).end();
    } catch (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

