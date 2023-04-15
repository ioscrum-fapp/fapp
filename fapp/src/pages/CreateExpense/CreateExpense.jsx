import React from "react";
import "./CreateExpense.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewExpense } from "../../backend/expenseLogic";

const userId = 1;

const CreateExpense = () => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateNewExpense(navigate, userId, value, date, tags);
  };

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
        />{" "}
        <label> Date: </label>{" "}
        <input
          required
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />{" "}
        <button> Create </button>{" "}
      </form>{" "}
    </div>
  );
};

export default CreateExpense;
