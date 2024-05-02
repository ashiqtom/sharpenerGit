
const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','shibu@500',{
    dialect :'mysql',
    host:'localhost'   
});

module.exports=sequelize;
