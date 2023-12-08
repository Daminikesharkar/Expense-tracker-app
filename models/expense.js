const sequelize = require("../util/database");
const Sequelize = require('sequelize');

const Expenses = sequelize.define('expenses',{
    id:{
        type:Sequelize.INTEGER,
        allownull:false,
        autoIncrement:true,
        primaryKey:true
    },
    expenseamount:{
        type:Sequelize.INTEGER,
        allownull:false
    },
    description:{
        type:Sequelize.STRING,
        allownull:false
    },
    category:{
        type:Sequelize.STRING,
        allownull:false
    }
})

module.exports = Expenses;