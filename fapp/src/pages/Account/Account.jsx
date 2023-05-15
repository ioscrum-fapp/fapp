import React from "react";
import "./Account.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DeleteAccount } from "../../backend/accountsLogic";

const BACKEND_URL = "http://localhost:3030/accounts/";
const currency = "$";

export default function Account() {
  const { id } = useParams();
  const { json, isFinished, error } = useFetch(BACKEND_URL + id);
  const navigate = useNavigate();

  const handleClick = async () => {
    await DeleteAccount(id);
    navigate("/accounts/");
  };

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
        {json && <h1>Account: {json.name}</h1>}
        {json && (
          <p>
            Balance: {currency} {json.balance}
          </p>
        )}
        {json && (
          <button type="button" className="Button" onClick={handleClick}>
            Remove
          </button>
        )}
      </div>
    </>
  );
}
