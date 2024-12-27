import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
    const [name, setName] = useState('');
    const [yearlyEarnings, setYearlyEarnings] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/users');
                setName(response.data.name);
                setYearlyEarnings(response.data.yearlyEarnings);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5001/api/users', {
                name,
                yearlyEarnings: Number(yearlyEarnings)
            });
            alert('Settings updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to update settings');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Settings</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Yearly Earnings:</label>
                    <input
                        type="number"
                        value={yearlyEarnings}
                        onChange={(e) => setYearlyEarnings(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Save Changes</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
    },
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    formGroup: {
        marginBottom: '1rem'
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        marginTop: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ddd'
    },
    button: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Settings; 