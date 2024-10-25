// frontend/src/components/BudgetAlert.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const BudgetAlert = ({ budgetLimit }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/financials/expenses/');
        const total = response.data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        setTotalExpenses(total);

        if (total >= budgetLimit) {
          setAlertMessage("Warning: Budget Exceeded!");
        } else if (total >= budgetLimit * 0.8) {
          setAlertMessage("Caution: You're approaching your budget limit.");
        } else {
          setAlertMessage('');
        }
      } catch (error) {
        console.error("Error fetching expenses for budget alert:", error);
      }
    };

    fetchExpenses();
  }, [budgetLimit]);

  return (
    <div style={{ padding: '10px', border: '1px solid red', marginTop: '10px' }}>
      {alertMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{alertMessage}</p>}
      <p>Total Spending: ${totalExpenses.toFixed(2)} / Budget: ${budgetLimit}</p>
    </div>
  );
};

export default BudgetAlert;
