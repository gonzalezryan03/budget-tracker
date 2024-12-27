/**
 * BudgetController - all logic for adding, fetching, updating, and deleting budgets
 */

const fs = require('fs');
const path = require('path');

// For demonstration, we store data in data.json
const dataFilePath = path.join(__dirname, '../data', 'data.json');

const readDataFile = () => {
  let data = { months: {} };
  if (fs.existsSync(dataFilePath)) {
    const fileContents = fs.readFileSync(dataFilePath, 'utf-8');
    data = JSON.parse(fileContents || '{}');
  }
  return data;
};

const writeDataFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

/**
 * Get month data
 */
exports.getMonthData = (req, res) => {
  const data = readDataFile();
  return res.status(200).json(data.months || {});
};

/**
 * Update monthly spending
 * Request body: { month: 'January', spending: 1000 }
 */
exports.updateMonthlySpending = (req, res) => {
  const { month, spending } = req.body;
  const data = readDataFile();
  if (!data.months) {
    data.months = {};
  }

  if (!data.months[month]) {
    data.months[month] = { spending: 0, goal: 0 };
  }

  data.months[month].spending = spending;
  writeDataFile(data);

  return res.status(200).json({
    message: `Spending for ${month} updated successfully`,
    months: data.months
  });
};

/**
 * Update monthly goal
 * Request body: { month: 'January', goal: 500 }
 */
exports.updateMonthlyGoal = (req, res) => {
  const { month, goal } = req.body;
  const data = readDataFile();

  if (!data.months) {
    data.months = {};
  }

  if (!data.months[month]) {
    data.months[month] = { spending: 0, goal: 0 };
  }

  data.months[month].goal = goal;
  writeDataFile(data);

  return res.status(200).json({
    message: `Goal for ${month} updated successfully`,
    months: data.months
  });
};

exports.getSingleMonthData = (req, res) => {
    const { month } = req.params;
    const data = readDataFile();
    
    if (!data.months || !data.months[month]) {
        return res.status(404).json({ message: 'Month not found' });
    }
    
    const monthData = data.months[month];
    const monthlyIncome = 100000 / 12; // This should come from user profile
    const remaining = monthlyIncome - (monthData.spending || 0);
    
    return res.status(200).json({
        ...monthData,
        remaining
    });
};

exports.addDailyExpense = (req, res) => {
    const { date, amount, description } = req.body;
    const data = readDataFile();
    
    if (!data.dailyExpenses) {
        data.dailyExpenses = {};
    }
    
    if (!data.dailyExpenses[date]) {
        data.dailyExpenses[date] = [];
    }
    
    data.dailyExpenses[date].push({ amount, description });
    
    // Update monthly total
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    if (!data.months[month]) {
        data.months[month] = { spending: 0, goal: 0 };
    }
    data.months[month].spending = (data.months[month].spending || 0) + amount;
    
    writeDataFile(data);
    
    return res.status(200).json({
        message: 'Expense added successfully',
        dailyExpenses: data.dailyExpenses,
        months: data.months
    });
};