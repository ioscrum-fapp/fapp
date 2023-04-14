import React from 'react';
import './ExpensesList.css';
import {Link} from "react-router-dom";

const currency = '$'

function CreateExpense(expense) {
    return (
        <div className="ExpenseList-element" key={expense.id} >
            <Link to={`/expenses/` + expense.id}>
                <h1>Expense</h1>
            </Link>
            <h2>Value: { currency } { expense.value }</h2>
            <p>Tags: { expense.tags.join(', ') }</p>
        </div>
    );
}

const ExpensesList = ({ expenses }) => {
    return (
        <div className="ExpensesList">
            {expenses && expenses.map(CreateExpense)}
        </div>
    );
}

export default ExpensesList;
