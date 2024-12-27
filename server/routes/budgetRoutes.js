const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Retrieve data for all months
router.get('/', budgetController.getMonthData);

// Retrieve data for a single month
router.get('/:month', budgetController.getSingleMonthData);

// Update monthly spending
router.put('/spending', budgetController.updateMonthlySpending);

// Update monthly goal
router.put('/goal', budgetController.updateMonthlyGoal);

// Add daily expense
router.post('/expense', budgetController.addDailyExpense);

module.exports = router;