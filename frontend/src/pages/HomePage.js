import React from 'react';
import ExpenseList from '../components/ExpenseList';
import IncomeList from '../components/IncomeList';
import AddExpenseForm from '../components/AddExpenseForm';

const HomePage = () => {
  return (
    <div>
      <h1>Financial Dashboard</h1>
      <AddExpenseForm />
      <ExpenseList />
      <IncomeList />
    </div>
  );
};

export default HomePage;
