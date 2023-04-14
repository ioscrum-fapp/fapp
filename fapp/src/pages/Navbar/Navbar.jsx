import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";

const Navbar = () => (
    <nav className="Navbar">
        Navbar Component
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/accounts">Accounts</Link>
        </div>
    </nav>
);

export default Navbar;
