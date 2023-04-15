import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Placeholder from "./pages/Placeholder";
import Stats from "./pages/Stats";
import "./styles/App.css";
import Navbar from "./pages/Navbar/Navbar.jsx";
import Accounts from "./pages/Accounts/Accounts.jsx";
import NoPage from "./pages/NoPage/NoPage.jsx";
import Account from "./pages/Account/Account.jsx";
import Expenses from "./pages/Expenses/Expenses.jsx";
import Expense from "./pages/Expense/Expense.jsx";
import CreateAccount from "./pages/CreateAccount/CreateAccount.jsx";
import CreateExpense from "./pages/CreateExpense/CreateExpense.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        App component
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:id" element={<Account />} />
          <Route path="/accounts/add" element={<CreateAccount />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/:id" element={<Expense />} />
          <Route path="/expenses/add" element={<CreateExpense />} />
          <Route path="/statistics" element={<Stats />} />
          <Route path="/placeholder" element={<Placeholder />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
