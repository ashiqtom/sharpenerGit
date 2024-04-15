const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const sequelize = require('./util/database');
const adminRoutes = require('./routes/expenceRoutes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', adminRoutes);

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