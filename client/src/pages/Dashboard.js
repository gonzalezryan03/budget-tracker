import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import GoalsForm from '../components/GoalsForm';
import SavingsOverview from '../components/SavingsOverview';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState({ yearlyEarnings: 0 });
  const [monthsData, setMonthsData] = useState({});

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/users');
      if (response.status === 200) {
        setUserProfile(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserProfile = async (updatedEarnings) => {
    try {
      const response = await axios.put('http://localhost:5001/api/users', {
        name: userProfile.name,
        yearlyEarnings: updatedEarnings
      });
      if (response.status === 200) {
        setUserProfile((prev) => ({ ...prev, yearlyEarnings: updatedEarnings }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMonthsData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/budget');
      if (response.status === 200) {
        setMonthsData(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Refresh months data in child components
  const handleDataUpdate = (updatedMonths) => {
    setMonthsData(updatedMonths);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchMonthsData();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {userProfile.name || 'User'}</h2>
      <div style={styles.profileSection}>
        <h3>Yearly Earnings</h3>
        <input
          type="number"
          value={userProfile.yearlyEarnings}
          onChange={(e) => updateUserProfile(Number(e.target.value))}
          style={styles.input}
        />
      </div>

      <BudgetForm onUpdate={handleDataUpdate} />
      <GoalsForm onUpdate={handleDataUpdate} />

      <SavingsOverview
        monthsData={monthsData}
        yearlyEarnings={userProfile.yearlyEarnings}
      />
    </div>
  );
};

const styles = {
  profileSection: {
    backgroundColor: '#fff',
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '8px'
  },
  input: {
    padding: '0.5rem',
    marginTop: '0.5rem',
    display: 'block'
  }
};

export default Dashboard;