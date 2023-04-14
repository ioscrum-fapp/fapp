import React from 'react';
import './AccountsList.css';
import {Link} from "react-router-dom";

const currency = '$'

function CreateAccount(account) {
    return (
        <div className="AccountsList-element"key={account.id} >
            <Link to={`/accounts/` + account.id}>
                <h1>Account: { account.name }</h1>
            </Link>
            <p>Balance: {currency} { account.balance }</p>
        </div>
    );
}

const AccountsList = ({ accounts }) => {
    return (
        <div className="AccountsList">
            AccountsList Component
            {accounts && accounts.map(CreateAccount)}
        </div>
    );
}

export default AccountsList;
