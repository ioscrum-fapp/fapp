import React from "react";
import "./CreateAccount.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateNewAccount from "../../backend/accountsLogic";

const userId = 1;

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateNewAccount(navigate, userId, name, balance);
  };

  return (
    <div className="CreateAccount">
      <h1> Add new account </h1>{" "}
      <form onSubmit={handleSubmit}>
        <label> Name: </label>{" "}
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <label> Balance: </label>{" "}
        <input
          required
          type="number"
          step="0.01"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />{" "}
        <button> Create </button>{" "}
      </form>{" "}
    </div>
  );
};

export default CreateAccount;
