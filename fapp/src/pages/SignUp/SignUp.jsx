import React, { useCallback } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

import "./SignUp.css";

import { auth } from "../../backend/firebase";

// eslint-disable-next-line react/prop-types
function SignUp({ history }) {
  const navigate = useNavigate();
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        // await auth
        //     .createUserWithEmailAndPassword(email.value, password.value);
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        // eslint-disable-next-line react/prop-types
        // history.push("/");
        navigate("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <main>
      <form className="loginForm" onSubmit={handleSignUp}>
        <h1> Sign Up </h1>
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
          Sign Up
        </button>
        <Link to="/login"> Login </Link>
      </form>
    </main>
  );
}

export default SignUp;
