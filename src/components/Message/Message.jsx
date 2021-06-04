import React from "react";
import "./Message.scss";

function Message({ message }) {
  return (
    <li className="message">
      <img className="message__profile-img" src={message.avatar} alt="" />
      <div className="message__content">
        <div className="message__heading">
          <h5 className="message__username">{message.username}</h5>
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
