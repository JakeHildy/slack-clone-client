import React from "react";
import "./TextInput.scss";

function TextInput({ label, value, handleChange, placeholder }) {
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
        className="text-input__input"
      />
    </div>
  );
}

export default TextInput;
