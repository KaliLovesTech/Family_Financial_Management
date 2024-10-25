import React, { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseChart from '../components/ExpenseChart';
import BudgetAlert from '../components/BudgetAlert';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const budgetLimit = 1000; // Set your budget limit here

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div>
      <h1>Expenses</h1>
      <BudgetAlert budgetLimit={budgetLimit} />
      <AddExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseChart />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpensesPage;
