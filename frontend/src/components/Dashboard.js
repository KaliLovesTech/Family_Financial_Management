import React from 'react';
import MonthlySpendingChart from './MonthlySpendingChart';
import CategorySpendingChart from './CategorySpendingChart';
import BudgetAlert from './BudgetAlert';
import SavingsGoalTracker from './SavingsGoalTracker';
import RecurringExpenseList from './RecurringExpenseList';

const Dashboard = () => {
  const budgetLimit = 2000; // Example budget limit for the month
  const savingsGoal = 5000; // Example savings goal

  return (
    <div>
      <h2>Financial Dashboard</h2>
      <BudgetAlert budgetLimit={budgetLimit} />
      <SavingsGoalTracker savingsGoal={savingsGoal} />
      <MonthlySpendingChart />
      <CategorySpendingChart />
      <RecurringExpenseList />
    </div>
  );
};

export default Dashboard;
