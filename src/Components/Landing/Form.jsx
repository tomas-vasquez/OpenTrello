// Packages
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// Context API
import { UserContext } from "contexts/userContext";
import { AuthContext } from "contexts/authContext";

// // CSS Imports
// import "assets/css/landing.css";

import Controller_Auth from "fetchers/Auth";
import DB from "helpers/db";

export default function Landing({ setModalOpen }) {
  const db = new DB();
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

      setUserId({ id: data.user_data._id });
      db.set("api-token", data.api_token);
      db.set("userData", data.user_data);

      history.push("/home");
    });
  };

  return (
    <div className="row d-flex">
      <div className="col-md-8 col-lg-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <h1 className="display-4">Login</h1>

            <form
              className="form-box"
              action=""
              onSubmit={(event) => handleLogin(event)}
            >
              <div className="form-group">
                <input
                  id="input-email"
                  type="email"
                  placeholder="Email address"
                  className="form-control"
                  onChange={(event) => setLoginEmail(event.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  id="input-password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(event) => setLoginPass(event.target.value)}
                />
              </div>

              <div className="text-center">
                <button className="btn btn-info mb-3">Login</button>
                <br />
                <a
                  href="/"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen(true);
                  }}
                >
                  Sign Up Here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
