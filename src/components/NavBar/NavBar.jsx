import React, { useContext } from "react";
import "./NavBar.scss";
import UserContext from "./../../context/userContext";
import SettingsIcon from "./../Icons/SettingsIcon";
import CustomAvatarSmall from "./../CustomAvatarSmall/CustomAvatarSmall";

function NavBar({ handleOpenSettings, handleLogout }) {
  let userContext = useContext(UserContext);

  const userProfile = () => {
    const { username, avatarConfig } = userContext.userData;
    return (
      <>
        <h3 className="navbar__username">{username}</h3>
        <div className="navbar__logout" onClick={handleLogout}>
          logout
        </div>
        <div className="navbar__avatar">
          <CustomAvatarSmall avatarConfig={avatarConfig} />
        </div>
      </>
    );
  };

  return (
    <div className="navbar">
      <div className="navbar__icon" onClick={handleOpenSettings}>
        <SettingsIcon fill="#fff" />
      </div>
      {userContext.userData && userProfile()}
    </div>
  );
}

export default NavBar;
