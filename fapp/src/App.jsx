import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account/Account";
import Accounts from "./pages/Accounts/Accounts";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import CreateExpense from "./pages/CreateExpense/CreateExpense";
import Expense from "./pages/Expense/Expense";
import Expenses from "./pages/Expenses/Expenses";
import Home from "./pages/Home";
import Layout from "./pages/Layout/Layout";
import NoPage from "./pages/NoPage/NoPage";
import Login from "./pages/Login/Login";

import PlannedExpenses from "./pages/PlannedExpenses/PlannedExpenses";
import "./styles/App.css";
import Providers from "./common/Providers";
import SignUp from "./pages/SignUp/SignUp";
import PrivateRoute from "./common/PrivateRoute";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* <Route exact path="/accounts" element={<PrivateRoute element={<Accounts />} />} /> */}
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/accounts/:id" element={<Account />} />
              <Route path="/accounts/add" element={<CreateAccount />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/:id" element={<Expense />} />
              <Route path="/expenses/:id/edit" element={<CreateExpense />} />
              <Route path="/expenses/add" element={<CreateExpense />} />
              <Route path="/planned" element={<PlannedExpenses />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
