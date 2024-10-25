import React, { useEffect, useState } from 'react';
import api from '../api';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                const response = await api.get('/financials/expenses/');
                setExpenses(response.data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        }
        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Expenses</h2>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.description}: ${expense.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
