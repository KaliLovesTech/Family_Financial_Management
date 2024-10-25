import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SavingsChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Income', 'Expenses', 'Savings Goal'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB'],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await api.get('/financials/income/');
        const expenseResponse = await api.get('/financials/expenses/');
        const totalIncome = incomeResponse.data.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
        const totalExpenses = expenseResponse.data.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
        const savingsGoal = totalIncome * 0.2; // Assume 20% of income is the savings goal

        setChartData({
          labels: ['Income', 'Expenses', 'Savings Goal'],
          datasets: [
            {
              data: [totalIncome, totalExpenses, savingsGoal],
              backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB'],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data for savings chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Income vs Expenses vs Savings</h3>
      <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default SavingsChart;
