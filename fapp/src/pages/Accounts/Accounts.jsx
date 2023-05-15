import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import AccountsList from "../AccountsList/AccountsList.jsx";
import "./Accounts.css";

const url = "http://localhost:3030/accounts?user_id=";
const user_id = 1;

const Accounts = () => {
  const accounts_url = url + user_id;
  const { json, isFinished, error } = useFetch(accounts_url);

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
};

export default Accounts;
