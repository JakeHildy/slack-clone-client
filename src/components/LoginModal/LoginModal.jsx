import React, { useState, useEffect } from "react";
import "./LoginModal.scss";
import TextInput from "./../TextInput/TextInput";
import ButtonPrimary from "./../ButtonPrimary/ButtonPrimary";
import validator from "validator";
import { getAllUsers, createUser, loginUser } from "./../../utils/userAPI";
import { setSessionStorage } from "../../utils/loginUtils";

function LoginModal({ handleShowLogin }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const hideModal = () => {
    handleShowLogin(false);
  };

  useEffect(() => {
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setUsernameError("");
  }, [username]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    setConfirmPasswordError("");
  }, [confirmPassword]);

  const handleLogin = async () => {
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

    // Attempt Login
    try {
      const loginResponse = await loginUser(email, password);
      setSessionStorage(loginResponse.data);
      hideModal();
    } catch (err) {
      setPasswordError("username or pw incorrect.");
    }
  };

  const handleSignUp = async () => {
    let _emailError = "";
    if (!validator.isEmail(email)) {
      _emailError = `Invalid email`;
    }

    let _usernameError = "";
    if (validator.isEmpty(username)) {
      _usernameError = `Please enter a username`;
    }

    let _passwordError = "";
    if (validator.isEmpty(password)) {
      _passwordError = `Please enter a password`;
    }

    let _passwordConfirmError = "";
    if (validator.isEmpty(confirmPassword)) {
      _passwordConfirmError = `Please confirm password`;
    }
    if (password !== confirmPassword) {
      _passwordConfirmError = `Passwords don't match`;
    }

    if (
      _emailError ||
      _usernameError ||
      _passwordError ||
      _passwordConfirmError
    ) {
      setEmailError(_emailError);
      setUsernameError(_usernameError);
      setPasswordError(_passwordError);
      setConfirmPasswordError(_passwordConfirmError);
      return;
    }

    try {
      const newUser = await createUser({
        username,
        email,
        password,
      });
      setSigningUp(false);
    } catch (err) {
      setEmailError("email already taken.");
    }
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
            {signingUp && (
              <TextInput
                label="username"
                value={username}
                handleChange={setUsername}
                placeholder="Enter username..."
                error={usernameError}
              />
            )}

            <TextInput
              label="password"
              value={password}
              handleChange={setPassword}
              placeholder="Enter password..."
              error={passwordError}
              type="password"
            />
            {signingUp && (
              <TextInput
                label="confirm"
                value={confirmPassword}
                handleChange={setConfirmPassword}
                placeholder="Confirm password..."
                error={confirmPasswordError}
                type="password"
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
