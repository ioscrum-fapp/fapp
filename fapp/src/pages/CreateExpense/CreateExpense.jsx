import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewExpense } from "../../backend/expenseLogic";
import useFetch from "../../hooks/useFetch";
import "./CreateExpense.css";

const userId = 1;
const url = "http://localhost:3030/accounts?user_id=";

export default function CreateExpense() {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(undefined);
  const navigate = useNavigate();

  const accountUrl = url + userId;
  const {
    json: accountsJson,
    isFinished: accountsIsFinished,
    error: accountsError,
  } = useFetch(accountUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(selectedAccount);
    //tags are temporary an empty list TODO change that
    CreateNewExpense(navigate, userId, value, date, [], selectedAccount);
  };
  const handleSelect = (e) => {
    setSelectedAccount(e.target.value);
  };

  useEffect(() => {
    //console.log(accountsJson), 
    [accountsJson];
    if (accountsJson && !selectedAccount) {
      setSelectedAccount(accountsJson[0].id);
    }
  });

  return (
    <div className="CreateExpense">
      <h1> Add new expense </h1>
      <form onSubmit={handleSubmit}>
        <label> Value: </label>
        <input
          required
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label> Date: </label>
        <input
          required
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label> Account: </label>
        <select value={selectedAccount} onChange={handleSelect}>
          {accountsJson?.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        <button type="submit"> Create </button>
      </form>
    </div>
  );
}
