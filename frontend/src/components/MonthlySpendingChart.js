import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const MonthlySpendingChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Monthly Spending',
        data: [],
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/financials/expenses/');
        const expenses = response.data;

        // Group expenses by month
        const monthlySpending = expenses.reduce((acc, expense) => {
          const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
          acc[month] = (acc[month] || 0) + parseFloat(expense.amount);
          return acc;
        }, {});

        // Update chart data
        setChartData({
          labels: Object.keys(monthlySpending),
          datasets: [
            {
              label: 'Monthly Spending',
              data: Object.values(monthlySpending),
              borderColor: '#FF6384',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching expenses for chart:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h3>Monthly Spending Trends</h3>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default MonthlySpendingChart;
