import React, { useEffect } from "react";
import "./ExpensesList.css";
import { Link } from "react-router-dom";
import DateTimeToHumanReadableFormatDateTime from "../../backend/dateTimeLogic";
import { Timestamp } from "@firebase/firestore";

const currency = "$";

function CreateExpense(expense) {
  const { id } = expense;
  const { value, date, tags } = expense.data();
  const timestamp = new  Timestamp(date.seconds, date.nanoseconds);
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
        <h4>{DateTimeToHumanReadableFormatDateTime(timestamp.toDate())}</h4>
        <p>Tags: {tags.join(", ")}</p>
      </div>
    </div>
  );
}

export default function ExpensesList({ expenses }) {
  return (
    <div className="ExpensesList">
      {expenses && expenses.docs.map(CreateExpense)}
    </div>
  );
}
