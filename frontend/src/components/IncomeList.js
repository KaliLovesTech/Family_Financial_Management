// frontend/src/components/IncomeList.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const IncomeList = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await api.get('/financials/incomes/');
        setIncome(response.data);
      } catch (error) {
        console.error("Error fetching income:", error);
        setError("Failed to load income");
      } finally {
        setLoading(false);
      }
    };
    fetchIncome();
  }, []);

  if (loading) return <p>Loading income...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Income</h2>
      <ul>
        {income.map((entry) => (
          <li key={entry.id}>
            {entry.source}: ${entry.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
