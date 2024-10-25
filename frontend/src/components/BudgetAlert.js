import React, { useEffect, useState } from 'react';
import api from '../api';

const BudgetAlert = ({ budgetLimit }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/financials/expenses/');
        const total = response.data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        setTotalExpenses(total);
      } catch (error) {
        console.error("Error fetching total expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  if (totalExpenses >= budgetLimit) {
    return <p style={{ color: 'red' }}>Warning: You have exceeded your budget limit of ${budgetLimit}!</p>;
  } else if (totalExpenses >= budgetLimit * 0.8) {
    return <p style={{ color: 'orange' }}>Alert: You are close to reaching your budget limit of ${budgetLimit}.</p>;
  } else {
    return <p>Total Expenses: ${totalExpenses}</p>;
  }
};

export default BudgetAlert;
