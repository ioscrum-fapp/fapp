import { React, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Layout.css";
/*
<li>
  <img src={Logo} alt="logo" />
</li>
*/

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="NavMenu">
      <div className="HamburgerContainer">
        <div className={`Hamburger ${isOpen ? "active" : ""}`} onClick={toggle}>
          <span className="Line"></span>
          <span className="Line"></span>
          <span className="Line"></span>
        </div>
      </div>
      <nav className={`Menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
          <li>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li>
            <Link to="/planned">Planned Expenses</Link>
          </li>
        </ul>
      </nav>

      <div className="Contents">
        <Outlet />
      </div>
    </div>
  );
}
