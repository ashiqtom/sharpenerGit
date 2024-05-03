const Sequelize=require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('User', {
    // Model attributes
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;