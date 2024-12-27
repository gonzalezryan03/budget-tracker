import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const ExpenseCalendar = ({ onUpdate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [expenses, setExpenses] = useState({});

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateStr = selectedDate.toISOString().split('T')[0];
        
        try {
            await axios.post('http://localhost:5001/api/budgets/expense', {
                date: dateStr,
                amount: Number(amount),
                description
            });
            
            setExpenses({
                ...expenses,
                [dateStr]: [...(expenses[dateStr] || []), { amount: Number(amount), description }]
            });
            
            setAmount('');
            setDescription('');
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const tileContent = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        const dayExpenses = expenses[dateStr];
        
        if (dayExpenses && dayExpenses.length > 0) {
            const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            return (
                <div style={styles.tileContent}>
                    ${total}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={styles.container}>
            <div style={styles.calendarSection}>
                <Calendar 
                    onChange={handleDateClick}
                    value={selectedDate}
                    tileContent={tileContent}
                />
            </div>
            <div style={styles.formSection}>
                <h3>Add Expense for {selectedDate.toLocaleDateString()}</h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    calendarSection: {
        flex: '1'
    },
    formSection: {
        flex: '1',
        padding: '1rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    input: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem'
    },
    button: {
        padding: '0.75rem',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.2s'
    },
    tileContent: {
        fontSize: '0.8rem',
        color: '#4CAF50'
    }
};

export default ExpenseCalendar; 