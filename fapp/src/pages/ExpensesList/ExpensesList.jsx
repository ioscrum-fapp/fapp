import React from "react";
import "./ExpensesList.css";
import { Link } from "react-router-dom";

const currency = "$";

function DaysAgo(date) {
  return Math.ceil((new Date() - Date.parse(date)) / 86400000);
}

function CreateExpense(expense) {
  const { id, value, date, tags } = expense;
  return (
    <div className="ExpenseList-element" key={id}>
      <Link className="DetailsLink" to={`/expenses/${id}`}>
        <button type="button" className="DetailsButton">
          Details
        </button>
      </Link>
      <div className="DetailsInfo">
        <h2>
          Value: {currency} {value}
        </h2>
        <h4>{DaysAgo(date)} days ago</h4>
        <p>Tags: {tags.join(", ")}</p>
      </div>
    </div>
  );
}

export default function ExpensesList({ expenses }) {
  return (
    <div className="ExpensesList">
      {expenses && expenses.map(CreateExpense)}
    </div>
  );
}
