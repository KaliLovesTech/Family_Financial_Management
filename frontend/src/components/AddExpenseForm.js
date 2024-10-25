// frontend/src/components/AddExpenseForm.js
import React, { useState } from 'react';
import api from '../api';

const AddExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/financials/expenses/', {
        description,
        amount,
        date: new Date().toISOString().slice(0, 10),  // Current date
      });
      setMessage('Expense added successfully!');
      onAddExpense(response.data);  // Update ExpenseList with new data
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error("Error adding expense:", error);
      setMessage('Failed to add expense');
    }
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="submit">Add Expense</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddExpenseForm;
