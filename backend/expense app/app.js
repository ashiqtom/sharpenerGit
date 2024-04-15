const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const sequelize=new Sequelize('node-complete','root','shibu@500',{
    dialect:'mysql',
    host:'localhost'
});


const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
  category: {
    type: Sequelize.STRING, 
    allowNull: false
  }
});
app.post('/api/expenses', async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        const expense = await Expense.create({ amount, description, category });
        res.status(201).json(expense);
    } catch (err) {
        console.error('Error creating expense:', err);
        res.status(500).json({ error: 'Failed to create expense' });
    }
});


app.get('/api/expenses', async (req, res) => {
    try {
      const expenses = await Expense.findAll();
      res.status(200).json(expenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

app.delete('/api/expenses/:expenseId', async (req, res) => {
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
});
  
sequelize
    .sync()
    .then(() => {
        app.listen(1000, () => {
        console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });