import React from "react";
import "./CreateAccount.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const url = "http://localhost:3030/accounts/";
const user_id = 1;

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const new_uuid = uuid();
    const account = {
      id: new_uuid,
      user_id: user_id,
      name: name,
      balance: balance,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    }).then(() => {
      navigate("/accounts/" + new_uuid);
    });
  };

  return (
    <div className="CreateAccount">
      <h1>Add new account</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Balance:</label>
        <input
          required
          type="number"
          step="0.01"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateAccount;
