const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes=require('./routes/admin');
const loginRoutes=require('./routes/login');

app.use(adminRoutes);
app.use(loginRoutes);

app.listen(3000); 
