import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategorySpendingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Spending by Category',
        data: [],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/financials/expenses/');
        const expenses = response.data;

        // Group expenses by category
        const categorySpending = expenses.reduce((acc, expense) => {
          const category = expense.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
          return acc;
        }, {});

        // Update chart data
        setChartData({
          labels: Object.keys(categorySpending),
          datasets: [
            {
              label: 'Spending by Category',
              data: Object.values(categorySpending),
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching expenses for category chart:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h3>Spending by Category</h3>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default CategorySpendingChart;
