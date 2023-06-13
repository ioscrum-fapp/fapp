import React from "react";
import "./ExpensesList.css";
import { Link } from "react-router-dom";
import DateTimeToHumanReadableFormatDateTime from "../../backend/dateTimeLogic";
import { Timestamp } from "@firebase/firestore";
import { TAGS_COLLECTION } from "../../backend/tagLogic";
import { ACCOUNTS_COLLECTION } from "../../backend/accountsLogic";
import useDocument from "../../hooks/useDocument";

const currency = "$";

function CreateTag({ tagId }) {
  const [tag, ,] = useDocument(TAGS_COLLECTION, tagId);

  if (!tag) {
    return <span>Loading tag...</span>;
  }

  return (
    <span
      className="TagContainer"
      style={{
        border: `solid 2px ${tag.data()?.tagColor}`,
      }}
      key={tag.id}
    >
      {tag.data()?.description}
    </span>
  );
}

function CreateExpense({ expense }) {
  const { id } = expense;
  const { value, date, tags, accountId, isIncome } = expense.data();
  const timestamp = new Timestamp(date.seconds, date.nanoseconds);
  const [account, ,] = useDocument(ACCOUNTS_COLLECTION, accountId);

  const { name } = account?.data()??{};

  return (
    <div className="ExpenseList-element" key={id}>
      <Link className="DetailsLink" to={`/expenses/${id}`}>
        <button type="button" className="DetailsButton">
          Details
        </button>
      </Link>
      <div className="DetailsInfo">
        <h1 style={{color: isIncome?"green":"red"}}>
          {currency} {value}
        </h1>
        <h4>
          Account: {name}
        </h4>
        <h4>{DateTimeToHumanReadableFormatDateTime(timestamp.toDate())}</h4>
        Categories:
        {tags && tags.map((tag) => <CreateTag tagId={tag} />)}
      </div>
    </div>
  );
}

export default function ExpensesList({ expenses }) {
  return (
    <div className="ExpensesList">
      {expenses &&
        expenses.docs.map((expense) => (
          <CreateExpense key={expense.id} expense={expense} />
        ))}
    </div>
  );
}
