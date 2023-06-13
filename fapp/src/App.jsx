import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from "./common/Providers";
import Account from "./pages/Account/Account";
import Accounts from "./pages/Accounts/Accounts";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import CreateExpense from "./pages/CreateExpense/CreateExpense";
import CreateTag from "./pages/CreateTag/CreateTag";
import Expense from "./pages/Expense/Expense";
import Expenses from "./pages/Expenses/Expenses";
import Home from "./pages/Home";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import NoPage from "./pages/NoPage/NoPage";
import PieChart from "./pages/PieChart/PieChart";
import PlannedExpenses from "./pages/PlannedExpenses/PlannedExpenses";
import SignUp from "./pages/SignUp/SignUp";
import Tag from "./pages/Tag/Tag";
import Tags from "./pages/Tags/Tags";
import "./styles/App.css";

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
              <Route path="/tags" element={<Tags />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/accounts/:id" element={<Account />} />
              <Route path="/tag/:id" element={<Tag />} />
              <Route path="/accounts/add" element={<CreateAccount />} />
              <Route path="/tag/add" element={<CreateTag />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/:id" element={<Expense />} />
              <Route path="/expenses/:id/edit" element={<CreateExpense />} />
              <Route path="/expenses/add" element={<CreateExpense />} />
              <Route path="/planned" element={<PlannedExpenses />} />
              <Route path="/charts" element={<PieChart />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
