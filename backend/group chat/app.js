const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes=require('./routes/admin');
const loginRoutes=require('./routes/login');
const contactRoutes=require('./routes/contact');

app.use(adminRoutes);
app.use(loginRoutes);
app.use(contactRoutes);
 
app.listen(3000); 
