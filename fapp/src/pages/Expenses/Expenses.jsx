import React from "react";
import "./Expenses.css";
import { Link } from "react-router-dom";
import ExpensesList from "../ExpensesList/ExpensesList";
import useCollection from "../../hooks/useCollection";
import { EXPENSES_COLLECTION } from "../../backend/expenseLogic";
import { orderBy } from "@firebase/firestore";

export default function Expenses() {
  const [expenses, isFinished, error] = useCollection(EXPENSES_COLLECTION, orderBy("date"));

  return (
    <div className="Expenses">
      <Link to="/expenses/add">
        <button type="button" className="AddButton">
          Add Expense
        </button>
      </Link>
      {error && <div>{String(error)}</div>}
      {!isFinished && <div>Downloading accounts...</div>}
      {expenses && <ExpensesList expenses={expenses} />}
    </div>
  );
}
