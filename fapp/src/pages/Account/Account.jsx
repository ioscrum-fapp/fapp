import React from "react";
import "./Account.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ACCOUNTS_COLLECTION,
  DeleteAccount,
} from "../../backend/accountsLogic";
import useDocument from "../../hooks/useDocument";
import useCollection from "../../hooks/useCollection";
import {EXPENSES_COLLECTION} from "../../backend/expenseLogic";
import {where} from "@firebase/firestore";

const currency = "$";

export default function Account() {
  const { id } = useParams();
  const [account, isFinished, error] = useDocument(ACCOUNTS_COLLECTION, id);
  const [expenses] = useCollection(EXPENSES_COLLECTION, where("accountId", "==", id));

  const navigate = useNavigate();

  let sumOfExpenses = 0;

  if (expenses) {
        expenses.docs.forEach((expense) => {
            const { value, isIncome } = expense.data();
            sumOfExpenses += isIncome ? -1 * Number(value) : Number(value);
        });
  }

  const handleClick = async () => {
    await DeleteAccount(id);
    navigate("/accounts/");
  };

  const { name, balance } = account?.data() ?? {};

  return (
    <>
      <Link to="/accounts/">
        <button type="button" className="Button">
          Go back
        </button>
      </Link>
      <div className="Account">
        {error && <div>{error}</div>}
        {!isFinished && <div>Downloading account...</div>}
        {account && <h1>Account: {name}</h1>}
        {account && (
          <p>
            Balance: {(balance - sumOfExpenses).toFixed(2)} {currency}
          </p>
        )}
        {account && (
          <button type="button" className="Button" onClick={handleClick}>
            Remove
          </button>
        )}
      </div>
    </>
  );
}
