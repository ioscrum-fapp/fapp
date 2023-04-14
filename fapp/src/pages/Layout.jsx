import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.css";
import Logo from "../assets/Icon.svg";

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <img src={Logo} alt="logo"/>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/statistics">Statistics</Link>
          </li>
          <li>
            <Link to="/placeholder">Placeholder</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
