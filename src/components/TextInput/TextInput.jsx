import React from "react";
import "./TextInput.scss";
import ErrorIcon from "./../Icons/ErrorIcon";

function TextInput({ label, value, handleChange, placeholder, error }) {
  return (
    <div className="text-input">
      <label htmlFor={label} className="text-input__label">
        {`${label}:`}
      </label>
      <input
        id={label}
        name={label}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        className={`text-input__input ${
          !!error ? "text-input__input--error" : ""
        }`}
      />
      {error && (
        <div className="error">
          <div className="error__icon">
            <ErrorIcon fill="#bf360c" />
          </div>
          <p className="error__message">{error}</p>
        </div>
      )}
    </div>
  );
}

export default TextInput;
