import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateNewAccount } from "../../backend/accountsLogic";
import "./CreateAccount.css";
import { AuthContext } from "../../common/Auth";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId = await CreateNewAccount(
      currentUser.uid,
      name,
      parseFloat(balance)
    );
    navigate(`/accounts/${newId}`);
  };

  return (
    <div className="CreateAccount">
      <h1> Add new account </h1>
      <div className="GoBackButton">
        <Link to="/accounts">
          <button type="button" className="Button">
            Go back
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="AddingForm">
        <div className="formControl">
          <label> Name: </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label> Balance: </label>
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <div className="formControl">
          <button type="submit" className="submitButton">
            {" "}
            Create{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
