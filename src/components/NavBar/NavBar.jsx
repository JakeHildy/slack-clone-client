import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import SettingsIcon from "./../Icons/SettingsIcon";
import { getUserPublic } from "./../../utils/userAPI";
import CustomAvatarSmall from "./../CustomAvatarSmall/CustomAvatarSmall";

function NavBar({ handleOpenSettings }) {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(async () => {
    const userData = await getUserPublic(sessionStorage.getItem("id"));
    const { avatarConfig, username } = userData.user;
    setAvatar(avatarConfig);
    setUsername(username);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar__icon" onClick={handleOpenSettings}>
        <SettingsIcon fill="#fff" />
      </div>
      <h3 className="navbar__username">{username}</h3>
      <div className="navbar__avatar">
        {avatar && <CustomAvatarSmall avatarConfig={avatar} />}
      </div>
    </div>
  );
}

export default NavBar;
