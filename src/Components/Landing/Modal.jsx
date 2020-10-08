// Packages
import React, { useState } from "react";
import Modal from "react-modal";

// Context API

// // CSS Imports
import "assets/css/landing.css";
import Controller_Auth from "fetchers/Auth";

const modalStyles = {
  content: {
    width: "30%",
    height: "55%",
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
  const [signUpPassConf, setSignUpPassConf] = useState("");

  // Auth for UI
  const [signUpSent, setSignUpSent] = useState(false);
  const [accountMade, setAccountMade] = useState(false);

  const auth = new Controller_Auth();

  const closeModal = () => {
    // RESET ALL SIGN UP FIELDS UPON CLOSE
    setModalOpen(false);
    setAccountMade(false);
    setSignUpSent(false);

    setSignUpPass("");
    setSignUpPassConf("");
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
      <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Sign Up for Trello Clone!
      </h1>
      <form
        action=""
        className="sign-up"
        onSubmit={(event) => handleSignUp(event)}
      >
        <input
          type="username"
          placeholder="user name"
          onChange={(event) => setSignUpUSerName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          onChange={(event) => setSignUpEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setSignUpPass(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setSignUpPassConf(event.target.value);
          }}
        />
        <p style={{ fontSize: ".675rem", marginTop: "0" }}>
          Password must contain one uppercase letter and a number
        </p>
        <button className="button sign-up-btn">Sign Up!</button>
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
