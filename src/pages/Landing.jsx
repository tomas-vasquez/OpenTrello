// Packages
import React, { useState } from "react";

// Context API
import SingnupModal from "../components/Landing/Modal";
import LoginForm from "../components/Landing/LoginForm";

// // CSS Imports
import "assets/css/landing.css";

export default function Landing({ history }) {
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="main-container">
        <div className="intro">
          <h1
            style={{
              textAlign: "center",
              color: "white",
              margin: "1rem 0",
              marginTop: "4rem",
              fontSize: "2.5rem",
            }}
          >
            Open Trello
          </h1>
        </div>
        <LoginForm setModalOpen={setModalOpen} />
      </div>
      <SingnupModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
