import React from "react";
import "./Expense.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
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

  const handleClickEdit = async () => {
    navigate(`/expenses/${id}/edit`);
  };

  return (
    <>
      {json && (
        <Link to="/expenses/">
          <button type="button" className="Button">
            Go back
          </button>
        </Link>
      )}
      <div className="Account">
        {error && <div>{error}</div>}
        {!isFinished && <div>Downloading account...</div>}

        {json && (
          <h2>
            {currency} {json.value}
          </h2>
        )}
        {json && <h2>Date: {json.date}</h2>}
        {json && <p>Tags: {json.tags.join(", ")}</p>}
        <button className="Button" type="button" onClick={handleClickEdit}>
            Edit
        </button>
        <button className="Button" type="button" onClick={handleClick}>
            Remove
        </button>
      </div>
    </>
  );
}
