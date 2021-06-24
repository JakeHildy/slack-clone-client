import React, { useState, useEffect, useContext } from "react";
import "./NavBar.scss";
import UserContext from "./../../context/userContext";
import SettingsIcon from "./../Icons/SettingsIcon";
import CustomAvatarSmall from "./../CustomAvatarSmall/CustomAvatarSmall";

function NavBar({ handleOpenSettings, handleLogout }) {
  let userContext = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="navbar__icon" onClick={handleOpenSettings}>
        <SettingsIcon fill="#fff" />
      </div>
      {userContext.userData && (
        <>
          <h3 className="navbar__username">{userContext.userData.username}</h3>
          <div className="navbar__logout" onClick={handleLogout}>
            logout
          </div>
          <div className="navbar__avatar">
            <CustomAvatarSmall
              avatarConfig={userContext.userData.avatarConfig}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
