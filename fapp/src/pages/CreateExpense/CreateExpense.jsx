import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    //tags are temporary an empty list TODO change that
    CreateNewExpense(navigate, userId, value, date, [], selectedAccount);
  };

  useEffect(() => {
    [accountsJson];
    if (accountsJson && !selectedAccount) {
      setSelectedAccount(accountsJson[0].id);
    }
  });

  return (
    <>
      <Link to="/expenses/">
        <button type="button" className="Button">
          Go back
        </button>
      </Link>
      <div className="CreateExpense">
        <h1> Add new expense </h1>
        <form onSubmit={handleSubmit} className="AddingForm">
          <div className="formControl">
            <label> Value: </label>
            <input
              required
              type="number"
              step="0.01"
              value={value}
              min="0"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="formControl">
            <label> Date: </label>
            <input
              required
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="formControl">
            <label> Account: </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              {accountsJson?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div className="formControl">
            <button type="submit" className="submitButton">
              {" "}
              Create{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
