import React, { useEffect } from "react";
import "./CreateExpense.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewExpense } from "../../backend/expenseLogic";
import useFetch from "../../hooks/useFetch";

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
    CreateNewExpense(navigate, userId, value, date, undefined, selectedAccount);
  };

  useEffect(() => console.log(accountsJson), [accountsJson]);

  return (
    <div className="CreateExpense">
      CreateExpense Component <h1> Add new expense </h1>{" "}
      <form onSubmit={handleSubmit}>
        <label> Value: </label>{" "}
        <input
          required
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label> Date: </label>{" "}
        <input
          required
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit"> Create </button>
      </form>
    </div>
  );
}
