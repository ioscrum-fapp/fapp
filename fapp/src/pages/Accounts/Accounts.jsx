import React from "react";
import "./Accounts.css";
import useFetch from "../../hooks/useFetch.jsx";
import AccountsList from "../AccountsList/AccountsList.jsx";
import { Link } from "react-router-dom";

const url = "http://localhost:3030/accounts?user_id=";
const user_id = 1;

const Accounts = () => {
  const accounts_url = url + user_id;
  const { json, isFinished, error } = useFetch(accounts_url);

  return (
    <div className="Accounts">
      Accounts Component
      <Link to="/accounts/add">Add</Link>
      {error && <div>{error}</div>}
      {!isFinished && <div>Downloading accounts...</div>}
      {json && <AccountsList accounts={json} />}
    </div>
  );
};

export default Accounts;
