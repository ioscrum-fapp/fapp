import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "./AccountsList.css";
import useCollection from "../../hooks/useCollection";
import {EXPENSES_COLLECTION} from "../../backend/expenseLogic";
import {getDocs, query, where} from "@firebase/firestore";

const currency = "$";

function CreateAccount(account) {
    const { id } = account;
    const { name, balance } = account.data();
    const [expenses] = useCollection(EXPENSES_COLLECTION, where("accountId", "==", id));

    let sumOfExpenses = 0;

    if (expenses) {
        expenses.docs.forEach((expense) => {
            const { value, isIncome } = expense.data();
            sumOfExpenses += isIncome ? -1 * Number(value) : Number(value);
        });
    }




    return (
        <div className="AccountsList-element" key={id}>
            <Link className="AccountdetailsLink" to={`/accounts/${id}`}>
                <button type="button" className="DetailsButton">
                    Details
                </button>
            </Link>
            <h1>Account: {name}</h1>
            <p>
                Balance: {(balance - sumOfExpenses).toFixed(2)} {currency}
            </p>
        </div>
    );
}

export default function AccountsList({ accounts }) {
    return (
        <div className="AccountsList">
            {accounts && accounts.map(CreateAccount)}
        </div>
    );
}
