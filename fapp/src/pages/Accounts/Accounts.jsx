import React from "react";
import { Link } from "react-router-dom";
import AccountsList from "../AccountsList/AccountsList";
import useCollection from "../../hooks/useCollection";
import "./Accounts.css";
import { ACCOUNTS_COLLECTION } from "../../backend/accountsLogic";

export default function Accounts() {
  const [accounts, isFinished, error] = useCollection(ACCOUNTS_COLLECTION);

  return (
    <div className="Accounts">
      <div className="AddDiv">
        <Link className="AddLink" to="/accounts/add">
          <button type="button" className="AddButton">
            Add new account
          </button>
        </Link>
      </div>
      {error && <div>{error}</div>}
      {!isFinished && <div>Downloading accounts...</div>}
      {accounts && <AccountsList accounts={accounts.docs} />}
    </div>
  );
}
