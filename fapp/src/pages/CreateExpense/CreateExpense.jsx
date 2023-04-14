import React from 'react';
import './CreateExpense.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';

const url = 'http://localhost:3030/expenses/'
const user_id = 1;
// const locales = 'pl-PL'

const CreateExpense = () => {
    // const currentDate = new Date();
    // const formattedDate = currentDate.toLocaleString(locales);
    // console.warn(formattedDate)

    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const new_uuid = uuid();
        const expense =
            {
                id: new_uuid,
                user_id: user_id,
                value: value,
                tags: [] // todo tags
            };

        fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(expense)
        }).then(() => {
            navigate('/expenses/' + new_uuid);
        })
    }

    return (
        <div className="CreateExpense">
            CreateExpense Component
            <h1>Add new expense</h1>
            <form onSubmit={handleSubmit}>
                <label>Value:</label>
                <input
                    required
                    type="number"
                    step="0.01"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button>Create</button>
            </form>
        </div>
    );
}

export default CreateExpense;
