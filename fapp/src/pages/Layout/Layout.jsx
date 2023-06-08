import { React, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Layout.css";
import Logo from "../../assets/Icon2.svg";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation().pathname.split("/")[1];

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="NavMenu">
      <img src={Logo} alt="logo" className="logoOnMobile" />
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
            <img src={Logo} alt="logo" className="logoOnBigScreen" />
          </li>
          <li>
            {location !== "" ? (
              <Link to="/">Home</Link>
            ) : (
              <h1 className="CurrentLocation">Home</h1>
            )}
          </li>
          <li>
            {location !== "accounts" ? (
              <Link to="/accounts">Accounts</Link>
            ) : (
              <h1 className="CurrentLocation">Accounts</h1>
            )}
          </li>
          <li>
            {location !== "expenses" ? (
              <Link to="/expenses">Expenses</Link>
            ) : (
              <h1 className="CurrentLocation">Expenses</h1>
            )}
          </li>
          <li>
            {location !== "planned" ? (
              <Link to="/planned">Planned</Link>
            ) : (
              <h1 className="CurrentLocation">Planned</h1>
            )}
          </li>
        </ul>
      </nav>

      <div className="Contents">
        <Outlet />
      </div>
    </div>
  );
}
