import React from "react";
import "./DropDown.scss";

function DropDown({ label, value, options, handleChange }) {
  return (
    <div className="dropdown">
      <label htmlFor={label} className="dropdown__label">
        {label}
      </label>
      <select
        id={label}
        name={label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="dropdown__select"
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropDown;
