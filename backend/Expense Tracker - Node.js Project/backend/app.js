const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./util/database');
const hemet=require('helmet');
const morgan=require('morgan');
const path = require('path');
const fs=require('fs');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
app.use(hemet()); 
const accessLogStream=fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {flags:'a'} 
)
app.use(morgan('combined',{stream: accessLogStream}));

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ForgotPasswordRequests = require('./models/forgotPasswordRequests');
const FilesDownloaded=require('./models/filesDownloaded');

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);
User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);

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