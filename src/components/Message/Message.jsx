import React, { useState, useEffect } from "react";
import "./Message.scss";
import { getUserPublic } from "./../../utils/userAPI";
import CustomAvatarSmall from "./../CustomAvatarSmall/CustomAvatarSmall";

function Message({ message }) {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(async () => {
    const userData = await getUserPublic(message.userId);
    const { avatarConfig, username } = userData.user;
    setAvatar(avatarConfig);
    setUsername(username);
  }, []);

  return (
    <li className="message">
      {/* <img className="message__profile-img" src={message.avatar} alt="" /> */}
      {avatar && <CustomAvatarSmall avatarConfig={avatar} />}
      <div className="message__content">
        <div className="message__heading">
          <h5 className="message__username">{username}</h5>
          <p className="message__time">
            {new Date(message.time).toLocaleTimeString()}
          </p>
        </div>

        <p className="message__text">{message.text}</p>
      </div>
    </li>
  );
}

export default Message;
