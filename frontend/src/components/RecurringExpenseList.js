import React, { useEffect, useState } from 'react';
import api from '../api';

const RecurringExpenseList = () => {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecurringExpenses = async () => {
      try {
        const response = await api.get('/financials/recurring_expenses/');
        setRecurringExpenses(response.data);
      } catch (error) {
        console.error("Error fetching recurring expenses:", error);
        setError("Failed to load recurring expenses.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecurringExpenses();
  }, []);

  if (loading) return <p>Loading recurring expenses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Recurring Expenses</h3>
      <ul>
        {recurringExpenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - Appears {expense.count} times
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecurringExpenseList;
