import React from 'react';

const SavingsOverview = ({ monthsData, yearlyEarnings }) => {
    /**
     * For each month:
     * - spending
     * - goal
     *  We can compute the savings for each month (yearlyEarnings / 12) - spending
     */

    // Convert object to array for easy mapping
    const months = Object.keys(monthsData || {});
    return (
    <div style={styles.container}>
        <h3>Your Monthly Overview</h3>
        {months.length === 0 ? (
        <p>No data available yet!</p>
        ) : (
        <table style={styles.table}>
            <thead>
            <tr>
                <th>Month</th>
                <th>Spending</th>
                <th>Goal</th>
                <th>Estimated Savings</th>
                <th>Goal Achieved?</th>
            </tr>
            </thead>
            <tbody>
            {months.map((month) => {
                const data = monthsData[month];
                const estimatedMonthlyIncome = yearlyEarnings / 12;
                const estimatedSavings = estimatedMonthlyIncome - (data.spending || 0);
                const goalAchieved = estimatedSavings >= data.goal;
                return (
                <tr key={month}>
                    <td>{month}</td>
                    <td>${data.spending}</td>
                    <td>${data.goal}</td>
                    <td>${estimatedSavings.toFixed(2)}</td>
                    <td>{goalAchieved ? 'Yes' : 'No'}</td>
                </tr>
                );
            })}
            </tbody>
        </table>
        )}
    </div>
    );
};
const styles = {
    container: {
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '8px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    }
};
  
export default SavingsOverview;