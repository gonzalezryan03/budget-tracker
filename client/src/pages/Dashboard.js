import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseCalendar from '../components/ExpenseCalendar';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [monthlyData, setMonthlyData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userResponse, budgetResponse] = await Promise.all([
                axios.get('http://localhost:5001/api/users'),
                axios.get('http://localhost:5001/api/budgets')
            ]);
            setUserData(userResponse.data);
            setMonthlyData(budgetResponse.data);
        } catch (err) {
            console.error(err);
        }
    };

    const chartData = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: 'Monthly Spending',
                data: Object.values(monthlyData).map(month => month.spending || 0),
                borderColor: '#4CAF50',
                tension: 0.1
            },
            {
                label: 'Monthly Goals',
                data: Object.values(monthlyData).map(month => month.goal || 0),
                borderColor: '#2196F3',
                tension: 0.1
            }
        ]
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Welcome, {userData?.name}</h1>
                <p>Yearly Earnings: ${userData?.yearlyEarnings?.toLocaleString()}</p>
            </div>
            
            <div style={styles.mainContent}>
                <ExpenseCalendar onUpdate={fetchData} />
                
                <div style={styles.chartSection}>
                    <h2>Spending Overview</h2>
                    <Line data={chartData} />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
    },
    header: {
        marginBottom: '2rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    mainContent: {
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: '1fr 1fr'
    },
    chartSection: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
};

export default Dashboard;