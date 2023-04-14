import React from 'react';
import './Expenses.css';
import useFetch from "../../hooks/useFetch.jsx";
import ExpensesList from "../ExpensesList/ExpensesList.jsx";
import {Link} from "react-router-dom";

const url = 'http://localhost:3030/expenses?user_id='
const user_id = 1

const Expenses = () => {
    const expense_url = url + user_id
    const { json, isFinished, error } = useFetch(expense_url)

    return (
        <div className = "Expenses" >
            Expenses Component
            <Link to="/expenses/add">Add</Link>
            { error && <div>{ error }</div> }
            { !isFinished && <div>Downloading accounts...</div> }
            { json && <ExpensesList expenses={json} /> }
        </div>
    );
}

export default Expenses;
