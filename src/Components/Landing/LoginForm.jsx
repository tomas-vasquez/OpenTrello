// Packages
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// Context API
import { UserContext } from "contexts/userContext";
import { AuthContext } from "contexts/authContext";

// // CSS Imports
import "assets/css/landing.css";

import Controller_Auth from "fetchers/Auth";

export default function Landing({ setModalOpen }) {
  const auth = new Controller_Auth();

  // Login Hooks
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Auth for UI
  const { setUserId } = useContext(UserContext);
  const { setAuthed } = useContext(AuthContext);

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(loginEmail, loginPass, (data) => {
      setAuthed(true);
      alert("hola");
      setUserId(data.userid);
      localStorage.setItem("rememberMe", true);
      localStorage.setItem("userId", data.userid);
      history.push("/home");
    });
  };

  return (
    <div className="login">
      <div className="login-box">
        <h1 className="title1">Login</h1>

        <form
          className="login-form"
          action=""
          onSubmit={(event) => handleLogin(event)}
        >
          <input
            id="input-email"
            type="email"
            placeholder="Email address"
            className="inputBox"
            onChange={(event) => setLoginEmail(event.target.value)}
          />
          <input
            id="input-password"
            type="password"
            placeholder="Password"
            className="inputBox"
            onChange={(event) => setLoginPass(event.target.value)}
          />
          <button className="button">Login</button>
        </form>

        <p
          className="else"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Sign Up Here
        </p>
      </div>
    </div>
  );
}
