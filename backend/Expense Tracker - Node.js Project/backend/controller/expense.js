const { where } = require('sequelize');
const Expense = require('../models/expense');

exports.getExpence=async (req, res) => {
    try {
      const expenses = await Expense.findAll({where:{UserId:req.user.id}});
      res.status(200).json(expenses);
    } catch (err) { 
      console.error('Error fetching expenses:', err);
      res.status(500).json({ err: 'Failed to fetch expenses' });
    }
}

exports.postExpence=async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        const expense = await Expense.create({ amount, description, category,UserId:req.user.id});
        if(req.user.totalExpense===null){
          req.user.update({ totalExpense:amount });
        }else{
          const expense=req.user.totalExpense+ parseInt(amount);
          req.user.update({ totalExpense:expense });
        }
        res.status(201).json(expense);
    } catch (err) {
        console.error('Error creating expense:', err);
        res.status(500).json({ err: 'Failed to create expense' });
    }
  }

exports.deleteExpence=async (req, res) => {
    const expenseId = req.params.expenseId;
    try {
      const curentExpense=await Expense.findOne({where:{id: expenseId, UserId:req.user.id}})
        await Expense.destroy({where: { id: expenseId, UserId:req.user.id }});
        if(curentExpense.amount>0){
          const expense=req.user.totalExpense - curentExpense.amount;
          req.user.update({ totalExpense:expense });
        }
        res.status(204).end();
    } catch (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ err: 'Internal Server Error' });
    }
}