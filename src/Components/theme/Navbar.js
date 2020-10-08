import React, { useState, useContext } from "react";
import "assets/css/nav.css";

import { UserContext } from "contexts/userContext";
import { AuthContext } from "contexts/authContext";

export default function Navbar({ history }) {
  const { userId, setUserId } = useContext(UserContext);
  const { authed, setAuthed } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.setItem("rememberMe", false);
    localStorage.setItem("userId", "");

    setUserId(null);
    setAuthed(false);
  };

  return (
    <div className="bar">
      <h1>Open-Trello</h1>
      <button
        className="signout"
        onClick={() => {
          handleLogout();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
