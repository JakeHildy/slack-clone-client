import React from "react";
import "./NavBar.scss";
import SettingsIcon from "./../Icons/SettingsIcon";

function NavBar({ handleOpenSettings }) {
  return (
    <div className="navbar">
      <div className="navbar__icon" onClick={handleOpenSettings}>
        <SettingsIcon fill="#fff" />
      </div>
    </div>
  );
}

export default NavBar;
