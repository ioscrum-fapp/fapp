import React from 'react';
import './Expense.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";

const currency = '$'
const url = 'http://localhost:3030/expenses/'

const Expense = () => {
    const { id } = useParams();
    const expense_url = url + id
    const { json, isFinished, error } = useFetch(expense_url);
    const navigate = useNavigate();

    const handleClick = () => {
        fetch(expense_url, {
            method: 'DELETE'
        }).then(() => {
            navigate('/expenses');
        })
    }

    return (
        <div className="Account" >
            Expense component
            { error && <div>{ error }</div> }
            { !isFinished && <div>Downloading account...</div> }
            { json && <h1>Expense</h1> }
            { json && <Link to={`/expenses/`}>Go back</Link> }
            { json && <h2>Value: { currency } { json.value }</h2> }
            { json && <h2>Date: { json.date }</h2> }
            { json && <p>Tags: { json.tags }</p> }
            { json && <button onClick={handleClick}>Remove</button> }
        </div>
    );

}


export default Expense;
