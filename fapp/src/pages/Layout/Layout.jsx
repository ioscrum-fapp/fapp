import { React, useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";
import Logo from "../../assets/Icon2.svg";
import { AuthContext } from "../../common/Auth";
import { auth } from "../../backend/firebase";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  async function logout() {
    try {
      await auth.signOut();
      console.log("User logged out successfully.");
      navigate("/");
      // Additional actions after logout (e.g., redirecting to a different page)
    } catch (error) {
      console.error("Error logging out:", error.message);
      // Handle any error that occurred during logout
    }
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { currentUser } = useContext(AuthContext);

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
          {currentUser ? (
            <>
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

              <li>
                {location !== "tags" ? (
                  <Link to="/tags">Categories</Link>
                ) : (
                  <h1 className="CurrentLocation">Categories</h1>
                )}
              </li>

              <li>
                {" "}
                <h1 className="CurrentLocation" onClick={() => logout()}>
                  {currentUser.email}
                </h1>{" "}
              </li>
            </>
          ) : (
            <>
              <li>
                {location !== "login" ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <h1 className="CurrentLocation">Login</h1>
                )}
              </li>
              <li>
                {location !== "signUp" ? (
                  <Link to="/signUp">Sign Up</Link>
                ) : (
                  <h1 className="CurrentLocation">Sign Up</h1>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="Contents">
        <Outlet />
      </div>
    </div>
  );
}
