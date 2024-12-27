const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Retrieve data for all months
router.get('/', budgetController.getMonthData);

// Update monthly spending
router.put('/spending', budgetController.updateMonthlySpending);

// Update monthly goal
router.put('/goal', budgetController.updateMonthlyGoal);

module.exports = router;