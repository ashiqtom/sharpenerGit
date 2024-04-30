const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Player = sequelize.define('Player', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    scores: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    photoLink : {
        type: Sequelize.STRING,
        allowNull: false,
      }
  });
  
  module.exports=Player;