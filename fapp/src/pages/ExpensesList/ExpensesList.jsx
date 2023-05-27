import React from "react";
import "./ExpensesList.css";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DateTimeToHumanReadableFormatDateTime from "../../backend/dateTimeLogic";

const ACCOUNT_URL = "http://localhost:3030/accounts?user_id=";
const userId = 1;
const currency = "$";


function CreateExpense(expense) {

  const accountsUrl = ACCOUNT_URL + userId;
  const { json, isFinished, error } = useFetch(accountsUrl);
  const { id, value, date, tags, accountId } = expense;
  return (
    <>
      {!isFinished && <div>Downloading accounts...</div>}
      {error && <div>{error}</div>}
      {json && <div className="ExpenseList-element" key={id}>
        <Link className="DetailsLink" to={`/expenses/${id}`}>
          <button type="button" className="DetailsButton">
            Details
          </button>
        </Link>
        <div className="DetailsInfo">
          <h1>
            {currency} {value} from {json.find(({id: idToFind}) => idToFind == accountId).name}
          </h1>
          <h4>{DateTimeToHumanReadableFormatDateTime(new Date(date))}</h4>
          <p>Tags: {tags.join(", ")}</p>
        </div>
      </div>}
    </>
  );
}

export default function ExpensesList({ expenses }) {
  return (
    <div className="ExpensesList">
      {expenses && expenses.map(CreateExpense)}
    </div>
  );
}
