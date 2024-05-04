
const User = require('../models/user');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const Expense = require('../models/expense');

exports.getExpence=async (req, res) => {
    try {
      const expenses = await Expense.findAll({where:{UserId:req.user.id}});
      res.status(200).json(expenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
}

exports.postExpence=async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        console.log(req.user.id,'````````````````')
        const expense = await Expense.create({ amount, description, category,UserId:req.user.id});
        res.status(201).json(expense);
    } catch (err) {
        console.error('Error creating expense:', err);
        res.status(500).json({ error: 'Failed to create expense' });
    }
  }

exports.deleteExpence=async (req, res) => {
    const expenseId = req.params.expenseId;
    try {
        const expense = await Expense.destroy({where: { id: expenseId, UserId:req.user.id }});
        res.status(204).end();
    } catch (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.postUser=async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({ username, email, password:hashedPassword});
        res.status(201).json(newUser);

    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getlogin = async (req, res) => {
    try {
        const { email, password} = req.params; 
        const existingUser = await User.findOne({ where: { email } });
        
        if (!existingUser) {
            return res.status(404).json({ message: 'Invalid email' });
        }
        const existingPassword = existingUser.password;
        
        const passwordCompared=await bcrypt.compare(password,existingPassword);

        if(passwordCompared){
            return res.status(200).json({ message: 'Login successful' ,token: generateAccessToken(existingUser.id,existingUser.username)});
        }else{
            return res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},'22222222222222233333333333333333333')
}