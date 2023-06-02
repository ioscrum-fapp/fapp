import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {CreateNewAccount, EditAccount} from "../../backend/accountsLogic";
import "./CreateAccount.css";
import useFetch from "../../hooks/useFetch.jsx";
const userId = 1;

export default function CreateAccount() {
  const {id} = useParams();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const {
    json: accountJson,
    isFinished: accountIsFinished,
    error: accountError
  } = id ? useFetch(`http://localhost:3030/accounts/${id}`) : {json:null, isFinished:true, error:null};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id)
        EditAccount(navigate, userId, name, balance, id);
      else
        CreateNewAccount(navigate, userId, name, balance);
  };

  useEffect(() => {
    [accountJson];
    if (accountJson && !name) {
      setName(accountJson.name);
      setBalance(accountJson.balance)
    }
  });

  return (
    <div className="CreateAccount">
      <Link to={id ? `/accounts/${id}` : "/accounts"}>
        <button type="button" className="Button">
          Go back
        </button>
      </Link>
      <h1>{id ? "Edit account" : "Add new account"}</h1>
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
            {id ? "Edit" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
