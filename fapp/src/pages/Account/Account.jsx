import React from "react";
import "./Account.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";

const url = "http://localhost:3030/accounts/";
const currency = "$";

const Account = () => {
  const { id } = useParams();
  const { json, isFinished, error } = useFetch(
    "http://localhost:3030/accounts/" + id
  );
  const navigate = useNavigate();

  const handleClick = () => {
    fetch(url + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/accounts");
    });
  };

  return (
    <div className="Account">
      Account component
      {error && <div>{error}</div>}
      {!isFinished && <div>Downloading account...</div>}
      {json && <h1>Account: {json.name}</h1>}
      {<Link to={`/accounts/`}>Go back</Link>}
      {json && (
        <p>
          Balance: {currency} {json.balance}
        </p>
      )}
      {json && <button onClick={handleClick}>Remove</button>}
    </div>
  );
};
export default Account;
