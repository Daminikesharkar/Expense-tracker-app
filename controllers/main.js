const path = require('path');
const Expense = require('../models/expense');

const indexFilePath = path.join(__dirname,"../views/index.html")

exports.getIndex = (req,res)=>{
    try {
        res.sendFile(indexFilePath)
    } catch (error) {
        console.log(error);
    }
}

exports.getAllExpenses = async (req,res)=>{
    try {
        const expenses = await Expense.findAll();
        res.send(expenses);
    } catch (error) {
        console.log(error);
    }
}

exports.postExpense = async (req,res)=>{
    try {
        const expenseamount = req.body.expenseamountValue;
        const discription = req.body.discriptionValue;
        const category = req.body.categoryVal;

        console.log(expenseamount,discription,category);

        const expense = await Expense.create({
            expenseamount: expenseamount,
            description: discription,
            category:category
        })

        res.send(expense);
        
    } catch (error) {
        console.log(error);
    }
}

exports.deleteExpense = async (req,res)=>{
    try {
        const expense = await Expense.findByPk(req.params.id);
        return expense.destroy();
        
    } catch (error) {
        console.log(error);
    }
}

exports.editExpense = async (req,res)=>{
    try {
        const expense = await Expense.findByPk(req.params.id);
        res.send(expense);
                
    } catch (error) {
        console.log(error);        
    }
}