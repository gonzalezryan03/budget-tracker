import React, { useState } from 'react';
import axios from 'axios';

const GoalsForm = ({ onUpdate }) => {
  const [month, setMonth] = useState('January');
  const [goal, setGoal] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5001/api/budget/goal', {
        month,
        goal: Number(goal)
      });
      if (response.status === 200) {
        onUpdate(response.data.months);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3>Set Monthly Savings Goal</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)} style={styles.select}>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>

        <label>Goal:</label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Update Goal</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  select: {
    padding: '0.5rem'
  },
  input: {
    padding: '0.5rem'
  },
  button: {
    padding: '0.7rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
  }
};

export default GoalsForm;