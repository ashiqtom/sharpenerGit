const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const User = require('./models/user');
const Expense = require('./models/expense');
User.hasMany(Expense);
Expense.belongsTo(User);


const sequelize = require('./util/database');
const adminRoutes = require('./routes/user');

app.use('/',adminRoutes);


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