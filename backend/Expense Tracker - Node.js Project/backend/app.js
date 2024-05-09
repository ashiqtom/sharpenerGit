const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./util/database');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 
require('dotenv').config(); 

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ForgotPasswordRequests = require('./models/forgotPasswordRequests');

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

const adminRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes=require('./routes/premium');
const forgotRoutes=require('./routes/forgetpassword')

app.use('/user',adminRoutes);
app.use('/expenses',expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',forgotRoutes);

sequelize
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });