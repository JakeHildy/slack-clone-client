import React, { useState, useEffect } from "react";
import "./LoginModal.scss";
import TextInput from "./../TextInput/TextInput";
import ButtonPrimary from "./../ButtonPrimary/ButtonPrimary";
import validator from "validator";

function LoginModal({ handleShowSettings }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const hideModal = (e) => {
    handleShowSettings(false);
  };

  useEffect(() => {
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  const handleLogin = () => {
    let _emailError = "";
    if (!validator.isEmail(email)) {
      _emailError = `Invalid email`;
    }

    let _passwordError = "";
    if (validator.isEmpty(password)) {
      _passwordError = `Please enter a password`;
    }

    if (_emailError || _passwordError) {
      setEmailError(_emailError);
      setPasswordError(_passwordError);
      return;
    }

    console.log("attempt login");
  };

  const handleSignUp = () => {
    console.log("handlesignup");
  };

  const handleToggleSignup = (e) => {
    e.preventDefault();
    setSigningUp((current) => !current);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (signingUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
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
              error={emailError}
            />
            <TextInput
              label="password"
              value={password}
              handleChange={setPassword}
              placeholder="Enter password..."
              error={passwordError}
            />
            {signingUp && (
              <TextInput
                label="confirm"
                value={confirmPassword}
                handleChange={setConfirmPassword}
                placeholder="Confirm password..."
                error=""
              />
            )}
            <div className="login-modal__login-btn">
              <ButtonPrimary
                handleLogin={handleFormSubmit}
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
