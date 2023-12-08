const express = require('express');
const mainController = require('../controllers/main');

const router = express.Router();

router.get('/',mainController.getIndex);
router.get('/expenses',mainController.getAllExpenses)

router.post('/',mainController.postExpense);

router.get('/deleteExpense/:id',mainController.deleteExpense)
router.get('/editExpense/:id',mainController.editExpense);

module.exports = router;