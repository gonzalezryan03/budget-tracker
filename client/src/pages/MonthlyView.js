import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MonthlyView = () => {
    const { monthName } = useParams();
    const [monthData, setMonthData] = useState(null);
    
    useEffect(() => {
        const fetchMonthData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/budgets/${monthName}`);
                setMonthData(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        
        fetchMonthData();
    }, [monthName]);

    return (
        <div style={styles.container}>
            <h2>{monthName} Overview</h2>
            {monthData && (
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <h3>Spending</h3>
                        <p>${monthData.spending}</p>
                    </div>
                    <div style={styles.card}>
                        <h3>Goal</h3>
                        <p>${monthData.goal}</p>
                    </div>
                    <div style={styles.card}>
                        <h3>Remaining Budget</h3>
                        <p>${monthData.remaining}</p>
                    </div>
                </div>
            )}
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

export default MonthlyView; 