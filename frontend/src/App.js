import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExpensesPage from './pages/ExpensesPage';
import IncomePage from './pages/IncomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/expenses">Expenses</Link> | <Link to="/income">Income</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/income" element={<IncomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
