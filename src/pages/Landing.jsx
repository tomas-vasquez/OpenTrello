// Packages
import React, { useState } from "react";

// Context API
import SingnupModal from "../Components/Landing/Modal";
import LoginForm from "../Components/Landing/Form";

// // CSS Imports
// import "assets/css/landing.css";

export default function Landing({ history }) {
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="intro">
        <h1
          style={{
            textAlign: "center",
            color: "white",
            margin: "1rem 0",
            marginTop: "4rem",
            marginBottom: "4rem",
            fontSize: "2.5rem",
          }}
        >
          Open Trello
        </h1>
      </div>
      <div className="container">
        <LoginForm setModalOpen={setModalOpen} />
      </div>
      <SingnupModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
