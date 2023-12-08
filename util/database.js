const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensedb',"root","damini@123",{
    host:"localhost",
    dialect:"mysql"
});

module.exports = sequelize;