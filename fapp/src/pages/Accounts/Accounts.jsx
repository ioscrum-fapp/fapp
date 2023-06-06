import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AccountsList from "../AccountsList/AccountsList";
import "./Accounts.css";

const url = "http://localhost:3030/accounts?user_id=";
const userId = 1;

function Accounts() {
  const accountsUrl = url + userId;
  const { json, isFinished, error } = useFetch(accountsUrl);

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
      {json && <AccountsList accounts={json} />}
    </div>
  );
}

export default Accounts;
