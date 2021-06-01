import React, { useState } from "react";
import "./CurrentRoom.scss";

function CurrentRoom() {
  const [messages, setMessages] = useState(["one", "two"]);
  const [newMessage, setNewMessage] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    // socket.current.emit("newMessageToServer", { text: newMessage });
  };

  return (
    <div className="current-room">
      <form onSubmit={(e) => onFormSubmit(e)} className="form">
        <input
          type="text"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          placeholder="Enter Message..."
          className="form__input"
        />
        <button className="form__button">Submit</button>
      </form>
      <ul className="messages">
        {messages.map((message, i) => {
          return (
            <li key={i} className="messages__message">
              {message}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CurrentRoom;
