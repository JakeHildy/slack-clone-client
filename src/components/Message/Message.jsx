import React from "react";
import "./Message.scss";
import DefaultProfileImage from "./../../assets/images/portrait-placeholder.png";

function Message({ message }) {
  return (
    <li className="message">
      <img className="message__profile-img" src={DefaultProfileImage} alt="" />
      <div className="message__content">
        <div className="message__heading">
          <h5 className="message__username">{message.user}</h5>
          <p className="message__time">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>

        <p className="message__text">{message.text}</p>
      </div>
    </li>
  );
}

export default Message;
