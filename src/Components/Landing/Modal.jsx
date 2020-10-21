// Packages
import React, { useState } from "react";
import Modal from "react-modal";

// Context API

// // CSS Imports
// import "assets/css/landing.css";
import Controller_Auth from "../../fetchers/Auth";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

Modal.setAppElement("#root");

export default function Landing({ modalOpen, setModalOpen }) {
  // Sign Up Hooks
  const [signUpUSerName, setSignUpUSerName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");

  // Auth for UI
  const [signUpSent, setSignUpSent] = useState(false);
  const [accountMade, setAccountMade] = useState(false);

  const auth = new Controller_Auth();

  const closeModal = () => {
    // RESET ALL SIGN UP FIELDS UPON CLOSE
    setModalOpen(false);
    setAccountMade(false);
    setSignUpSent(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    auth.singup(
      {
        user_name: signUpUSerName,
        email: signUpEmail,
        password: signUpPass,
        // signUpPassConf,
      },
      () => {
        setModalOpen(false);
        setAccountMade(true);
      },
      (error) => {
        setAccountMade(false);
        // setErrorMsgSignup(data.error);
      }
    );
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <h1 className="display-4 mb-3">Sign Up for Open-Trello</h1>
      <form
        action=""
        className="sign-up"
        onSubmit={(event) => handleSignUp(event)}
      >
        <div className="form-group">
          <input
            type="username"
            className="form-control"
            placeholder="user name"
            onChange={(event) => setSignUpUSerName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            onChange={(event) => setSignUpEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            onChange={(event) => {
              setSignUpPass(event.target.value);
            }}
          />
        </div>
        {/* <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(event) => {
              setSignUpPassConf(event.target.value);
            }}
          />
        </div> */}
        <p style={{ fontSize: ".675rem", marginTop: "0" }}>
          Password must contain one uppercase letter and a number
        </p>
        <button className="btn btn-info">Sign Up!</button>
      </form>

      {signUpSent && accountMade ? (
        <p style={{ color: "green", margin: "0" }}>
          You're signed up! Login Now
        </p>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </Modal>
  );
}
