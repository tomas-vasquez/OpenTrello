// Packages
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "./Components/common/Loading.jsx";

// Protected Route for Auth
import ProtectedRoute from "./ProtectedRoute.js";

// Context APIaa
import { UserContext } from "./contexts/userContext";
import { AuthContext } from "./contexts/authContext";

// Page Components
import Trello from "./pages/Trello";
import Landing from "./pages/Landing";
import Layout from "./Components/common/Layouth";

// CSS Imports
import "./assets/css/styles.min.css";
import DB from "./helpers/db";

function App() {
  const [userId, setUserId] = useState("Default Value");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = new DB();
    const apiKey = db.get("api-token");

    if (apiKey) {
      setAuthed(true);
    }
    setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Layout>
      <AuthContext.Provider value={{ authed, setAuthed }}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Landing} />
              <ProtectedRoute component={Trello} />
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </Layout>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
