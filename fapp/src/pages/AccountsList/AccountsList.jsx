import React from "react";
import { Link } from "react-router-dom";
import "./AccountsList.css";

const currency = "$";

function CreateAccount(account) {
  return (
    <div className="AccountsList-element" key={account.id}>
      <Link className="AccountdetailsLink" to={`/accounts/` + account.id}>
        <button type="button" className="DetailsButton">
          Details
        </button>
      </Link>
      <h1>Account: {account.name}</h1>
      <p>
        Balance: {currency} {account.balance}
      </p>
    </div>
  );
}

const AccountsList = ({ accounts }) => {
  return (
    <div className="AccountsList">
      {accounts && accounts.map(CreateAccount)}
    </div>
  );
};

export default AccountsList;
