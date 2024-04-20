
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sequelize = require('./util/database');

const adminRoutes = require('./routes/admin');

app.use('/', adminRoutes);

sequelize
    .sync()
    .then(() => {
        app.listen(3000);
        console.log('Server is running on port 3000');
    })
    .catch(err => {
        console.error('Sequelize initialization error:', err);
    });



    