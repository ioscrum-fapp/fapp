import React from "react";
import "./Expenses.css";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ExpensesList from "../ExpensesList/ExpensesList";

const BACKEND_URL = "http://localhost:3030/expenses?user_id=";
const userId = 1;

export default function Expenses() {
  const expenseUrl = BACKEND_URL + userId;
  const { json, isFinished, error } = useFetch(expenseUrl);

  return (
    <div className="Expenses">
      <Link to="/expenses/add">
        <button type="button" className="AddButton">
          Add Expense
        </button>
      </Link>
      {error && <div>{error}</div>}
      {!isFinished && <div>Downloading accounts...</div>}
      {json && <ExpensesList expenses={json} />}
    </div>
  );
}
