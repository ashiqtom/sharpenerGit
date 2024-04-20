const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Attendance = sequelize.define('attendance', {
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
    },
    joe: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    maya: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    jaya: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    maie: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports=Attendance;