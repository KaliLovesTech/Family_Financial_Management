import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const ExpenseChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/financials/expenses/');
        const expenses = response.data;

        const expenseData = expenses.reduce((acc, expense) => {
          const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
          acc[month] = (acc[month] || 0) + parseFloat(expense.amount);
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(expenseData),
          datasets: [
            {
              label: 'Monthly Expenses',
              data: Object.values(expenseData),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching expense data for chart:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h3>Monthly Expenses</h3>
      {chartData.labels.length > 0 ? (
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default ExpenseChart;
