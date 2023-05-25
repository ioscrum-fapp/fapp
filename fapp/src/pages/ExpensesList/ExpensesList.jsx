import React from "react";
import "./ExpensesList.css";
import { Link } from "react-router-dom";
import DateTimeToHumanReadableFormatDateTime from "../../backend/dateTimeLogic";

const currency = "$";

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
        <h1>
          {currency} {value}
        </h1>
        <h4>{DateTimeToHumanReadableFormatDateTime(new Date(date))}</h4>
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
