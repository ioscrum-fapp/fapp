import React, { useEffect, useState } from "react";
import "./Expense.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteExpense, EXPENSES_COLLECTION } from "../../backend/expenseLogic";
import DateTimeToHumanReadableFormatDateTime from "../../backend/dateTimeLogic";
import useDocument from "../../hooks/useDocument";
import { Timestamp } from "@firebase/firestore";
import { TAGS_COLLECTION } from "../../backend/tagLogic";

const currency = "$";

function CreateTag({ tagId }) {
  const [tag] = useDocument(TAGS_COLLECTION, tagId);

  if (!tag) {
    return <p>Loading tag...</p>;
  }

  return (
      <p style={{ color: tag.data()?.tagColor }} key={tag.id}>
        {tag.data()?.description}
      </p>
  );
}

export default function Expense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, isFinished, error] = useDocument(EXPENSES_COLLECTION, id);
  const tagIdList = expense?.data()?.tags;

  const handleClick = async () => {
    await DeleteExpense(id);
    navigate("/expenses");
  };

  const handleClickEdit = async () => {
    navigate(`/expenses/${id}/edit`);
  };

  const data = expense?.data();
  const timestamp = data
    ? new Timestamp(data.date.seconds, data.date.nanoseconds)
    : undefined;

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
        {data && (
          <h2>{DateTimeToHumanReadableFormatDateTime(timestamp.toDate())}</h2>
        )}
        <p> Categories:</p>
        {tagIdList && tagIdList.map((tag) => (
            <CreateTag tagId={tag} />
        ))}
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
