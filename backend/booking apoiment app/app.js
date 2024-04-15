const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors()); 

const sequelize = require('./util/database');
const adminRoutes = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', adminRoutes);

sequelize.sync() 
  .then(() => {
    app.listen(3000, () => {
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });





