import React, { useState } from "react";
import "./LoginModal.scss";
import TextInput from "./../TextInput/TextInput";
import ButtonPrimary from "./../ButtonPrimary/ButtonPrimary";

function LoginModal({ handleShowSettings }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(true);

  const hideModal = (e) => {
    handleShowSettings(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handleLogin");
  };

  const handleToggleSignup = (e) => {
    e.preventDefault();
    setSigningUp((current) => !current);
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
            {signingUp && (
              <TextInput
                label="confirm"
                value={confirmPassword}
                handleChange={setConfirmPassword}
                placeholder="Confirm password..."
              />
            )}
            <div className="login-modal__login-btn">
              <ButtonPrimary
                handleLogin={handleLogin}
                label={signingUp ? "Sign-up" : "Login"}
              />
            </div>
            <h4 onClick={handleToggleSignup} className="login-modal__sign-up">
              {signingUp ? "Back" : "Sign up"}
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
