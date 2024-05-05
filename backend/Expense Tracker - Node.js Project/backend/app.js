const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./util/database');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const User = require('./models/user');
const Expense = require('./models/expense');

User.hasMany(Expense);
Expense.belongsTo(User);

const adminRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

app.use('/user',adminRoutes);
app.use('/expenses',expenseRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });