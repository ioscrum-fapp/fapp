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

  const toggle = () =>{
    setIsOpen(!isOpen)
  }
  return (
    
    <div className="NavMenu">
       <div className={`Hamburger ${isOpen ? 'active' : ''}`} onClick={toggle}>
          <span className="Line"></span>
          <span className="Line"></span>
          <span className="Line"></span>
      </div>
      <nav className={`Menu ${isOpen ? 'open' : ''}`}>
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
        </ul>
      </nav>
     
      <Outlet />
    </div>
  );
}
