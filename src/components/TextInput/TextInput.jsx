import React from "react";
import "./TextInput.scss";

function TextInput({ label, value, handleChange }) {
  return (
    <div className="text-input">
      <label htmlFor={label} className="text-input__label">
        Username:
      </label>
      <input
        id={label}
        name={label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        className="text-input__input"
      />
    </div>
  );
}

export default TextInput;
