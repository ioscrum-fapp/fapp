import React from "react";
import Logo from "../assets/Icon2.svg";
import {Link} from "react-router-dom";

export default function Home() {
  return <div>
    <h1>Welcome to</h1>
    <img src={Logo} alt="logo"/>
    <h2>Fapping saves you time and money!</h2>
    <h3>Add some fapping expenses in the <Link to="/expenses">Expense</Link> section</h3>
  </div>;
}
