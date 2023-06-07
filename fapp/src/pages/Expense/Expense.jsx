import React from "react";
import "./Expense.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteExpense, EXPENSES_COLLECTION } from "../../backend/expenseLogic";
import DateTimeToHumanReadableFormatDateTime from "../../backend/dateTimeLogic";
import useDocument from "../../hooks/useDocument";
import { Timestamp } from "@firebase/firestore";

const currency = "$";

export default function Expense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, isFinished, error] = useDocument(EXPENSES_COLLECTION, id);

  const handleClick = async () => {
    await DeleteExpense(id);
    navigate("/expenses");
  };

  const handleClickEdit = async () => {
    navigate(`/expenses/${id}/edit`);
  };

  const data = expense?.data()
  const timestamp = data ? new Timestamp(data.date.seconds, data.date.nanoseconds) : undefined;

  return (
    <>
      {data && (
        <Link to="/expenses/">
          <button type="button" className="Button">
            Go back
          </button>
        </Link>
      )}
      <div className="Account">
        {error && <div>{error}</div>}
        {!isFinished && <div>Downloading account...</div>}

        {data && (
          <h1>
            {currency} {data.value}
          </h1>
        )}
        {data && <h2>{DateTimeToHumanReadableFormatDateTime(timestamp.toDate())}</h2>}
        {data && <p>Tags: {data.tags.join(", ")}</p>}
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
