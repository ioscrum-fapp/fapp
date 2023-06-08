import React from "react";
import "./Account.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ACCOUNTS_COLLECTION,
  DeleteAccount,
} from "../../backend/accountsLogic";
import useDocument from "../../hooks/useDocument";

const currency = "$";

export default function Account() {
  const { id } = useParams();
  const [account, isFinished, error] = useDocument(ACCOUNTS_COLLECTION, id);
  const navigate = useNavigate();

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
            Balance: {currency} {balance?.toFixed(2)}
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
