import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account/Account.jsx";
import Accounts from "./pages/Accounts/Accounts.jsx";
import CreateAccount from "./pages/CreateAccount/CreateAccount.jsx";
import CreateExpense from "./pages/CreateExpense/CreateExpense.jsx";
import Expense from "./pages/Expense/Expense.jsx";
import Expenses from "./pages/Expenses/Expenses.jsx";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage/NoPage.jsx";
import PlannedExpenses from "./pages/PlannedExpenses/PlannedExpenses";
import "./styles/App.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/:id" element={<Account />} />
            <Route path="/accounts/add" element={<CreateAccount />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/:id" element={<Expense />} />
            <Route path="/expenses/add" element={<CreateExpense />} />
            <Route path="/planned" element={<PlannedExpenses />} />
            <Route path="*" element={<NoPage />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
