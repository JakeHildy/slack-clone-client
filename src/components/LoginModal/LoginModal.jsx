import React, { useState } from "react";
import "./LoginModal.scss";
import TextInput from "./../TextInput/TextInput";
import ButtonPrimary from "./../ButtonPrimary/ButtonPrimary";

function LoginModal({ handleShowSettings }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideModal = (e) => {
    handleShowSettings(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handleLogin");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("handleSignUp");
  };

  return (
    <div className="login-modal">
      <div className="login-modal__container">
        <h2 className="login-modal__heading">Welcome!</h2>
        <div className="login-modal__cta">
          <form className="login-modal__form">
            <TextInput
              label="email"
              value={email}
              handleChange={setEmail}
              placeholder="Enter email..."
            />
            <TextInput
              label="password"
              value={password}
              handleChange={setPassword}
              placeholder="Enter password..."
            />
            <div className="login-modal__login-btn">
              <ButtonPrimary handleLogin={handleLogin} />
            </div>
            <h4 onClick={handleSignUp} className="login-modal__sign-up">
              Sign up
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
