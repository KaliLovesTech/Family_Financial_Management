import React, { useEffect, useState } from 'react';
import api from '../api';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/financials/expenses/');
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const handleDelete = async (expenseId) => {
    try {
      await api.delete(`/financials/expenses/${expenseId}/`);
      setExpenses(expenses.filter((expense) => expense.id !== expenseId)); // Update state by removing deleted item
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError("Failed to delete expense");
    }
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedExpenses = [...expenses].sort((a, b) => {
      if (option === 'amount') return b.amount - a.amount;
      if (option === 'date') return new Date(b.date) - new Date(a.date);
      return 0;
    });
    setExpenses(sortedExpenses);
  };

  const filteredExpenses = expenses.filter(expense => {
    const amount = parseFloat(expense.amount);
    return (!minAmount || amount >= minAmount) && (!maxAmount || amount <= maxAmount);
  });

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Expenses</h2>
      <div>
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSort}>
            <option value="">Select</option>
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
        </label>
        <label>
          Min Amount:
          <input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
        </label>
        <label>
          Max Amount:
          <input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
        </label>
      </div>
      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: ${expense.amount} on {expense.date}
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
