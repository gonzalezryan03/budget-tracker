import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YearlyOverview = () => {
    const [yearData, setYearData] = useState({});
    const [yearlyEarnings, setYearlyEarnings] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [budgetResponse, userResponse] = await Promise.all([
                    axios.get('http://localhost:5001/api/budgets'),
                    axios.get('http://localhost:5001/api/users')
                ]);
                setYearData(budgetResponse.data);
                setYearlyEarnings(userResponse.data.yearlyEarnings);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const totalSpending = Object.values(yearData).reduce((sum, month) => 
        sum + (month.spending || 0), 0
    );

    const totalSavings = yearlyEarnings - totalSpending;

    return (
        <div style={styles.container}>
            <h2>Yearly Overview</h2>
            <div style={styles.grid}>
                <div style={styles.card}>
                    <h3>Total Income</h3>
                    <p>${yearlyEarnings.toLocaleString()}</p>
                </div>
                <div style={styles.card}>
                    <h3>Total Spending</h3>
                    <p>${totalSpending.toLocaleString()}</p>
                </div>
                <div style={styles.card}>
                    <h3>Total Savings</h3>
                    <p>${totalSavings.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
    },
    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
};

export default YearlyOverview; 