import React from "react";
import "./Expense.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import { DeleteExpense } from "../../backend/expenseLogic";

const currency = "$";
const url = "http://localhost:3030/expenses/";

export default function Expense() {
  const { id } = useParams();
  const expenseUrl = url + id;
  const { json, isFinished, error } = useFetch(expenseUrl);
  const navigate = useNavigate();

  const handleClick = async () => {
    await DeleteExpense(id);
    navigate("/expenses");
  };

  return (
    <div className="Account">
      Expense component
      {error && <div>{error}</div>}
      {!isFinished && <div>Downloading account...</div>}
      {json && <h1>Expense</h1>}
      {json && <Link to={`/expenses/`}>Go back</Link>}
      {json && (
        <h2>
          Value: {currency} {json.value}
        </h2>
      )}
      {json && <h2>Date: {json.date}</h2>}
      {json && <p>Tags: {json.tags}</p>}
      {json && (
        <button className="RemoveButton" type="button" onClick={handleClick}>
          Remove
        </button>
      )}
    </div>
  );
}
