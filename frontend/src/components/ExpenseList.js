import React, { useEffect, useState } from 'react';
import { parse } from 'json2csv';
import { saveAs } from 'file-saver';
import api from '../api';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');

  const exportToCSV = () => {
    try {
      const csv = parse(expenses); // Convert JSON to CSV
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'expenses.csv');
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

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

  const handleFilter = () => {
    let filteredExpenses = [...expenses];
    if (startDate) {
      filteredExpenses = filteredExpenses.filter((expense) => new Date(expense.date) >= new Date(startDate));
    }
    if (endDate) {
      filteredExpenses = filteredExpenses.filter((expense) => new Date(expense.date) <= new Date(endDate));
    }
    if (category) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.category === category);
    }
    setExpenses(filteredExpenses);
  };

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Expenses</h2>
      <div>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
          </select>
        </label>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={exportToCSV}>Export to CSV</button>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: ${expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
