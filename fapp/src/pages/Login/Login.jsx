import React, { useCallback, useContext } from "react";
import "./Login.css";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../common/Auth";
import { auth } from "../../backend/firebase";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        navigate("/accounts");
      } catch (error) {
        alert(error);
      }
    },
    [location]
  );

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate replace to="/" />;
  }
  return (
    <main>
      <form onSubmit={handleLogin} className="loginForm">
        <h1> Login </h1>
        <div className="box">
          {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
          <label htmlFor="email"> Email </label>
          <input id="email" name="email" type="text" />
        </div>
        <div className="box">
          {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
          <label htmlFor="password"> Password </label>
          <input id="password" name="password" type="password" />
        </div>
        <button className="btn-submit" type="submit">
          Sign In
        </button>
        <Link to="/signUp"> Sign up </Link>
      </form>
    </main>
  );
}

export default Login;
