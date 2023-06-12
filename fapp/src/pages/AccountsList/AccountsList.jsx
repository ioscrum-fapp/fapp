import React from "react";
import { Link } from "react-router-dom";
import "./AccountsList.css";

const currency = "$";

function CreateAccount(account) {
  const { id } = account;
  const { name, balance } = account.data();
  return (
    <div className="AccountsList-element" key={id}>
      <Link className="AccountdetailsLink" to={`/accounts/${id}`}>
        <button type="button" className="DetailsButton">
          Details
        </button>
      </Link>
      <h1>Account: {name}</h1>
      <p>
        Balance: {currency} {balance}
      </p>
    </div>
  );
}

export default function AccountsList({ accounts }) {
  return (
    <div className="AccountsList">
      {accounts && accounts.map(CreateAccount)}
    </div>
  );
}
