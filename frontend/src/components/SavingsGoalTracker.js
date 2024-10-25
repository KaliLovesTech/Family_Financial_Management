import React, { useEffect, useState } from 'react';
import api from '../api';

const SavingsGoalTracker = ({ savingsGoal = 1000 }) => {
  const [currentSavings, setCurrentSavings] = useState(0);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await api.get('/financials/savings/');
        const savings = response.data.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
        setCurrentSavings(savings);
      } catch (error) {
        console.error("Error fetching savings data:", error);
      }
    };

    fetchSavings();
  }, []);

  const progress = ((currentSavings / savingsGoal) * 100).toFixed(2);

  return (
    <div style={{ padding: '10px', border: '1px solid green', marginTop: '10px' }}>
      <h3>Savings Goal Tracker</h3>
      <p>Goal: ${savingsGoal}</p>
      <p>Current Savings: ${currentSavings}</p>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <progress value={currentSavings} max={savingsGoal} style={{ width: '80%', height: '20px' }}></progress>
        <span style={{ marginLeft: '10px' }}>{progress}%</span>
      </div>
    </div>
  );
};

export default SavingsGoalTracker;
