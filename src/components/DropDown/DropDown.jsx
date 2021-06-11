import React from "react";
import "./DropDown.scss";

function DropDown() {
  return (
    <div className="dropdown">
      <label htmlFor="toptype" className="dropdown__label">
        topType
      </label>
      <select
        id="topType"
        name="topType"
        value={topType}
        onChange={(e) => setTopType(e.target.value)}
        className="dropdown__select"
      >
        {avatarOptions.topType.map((option, i) => {
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
