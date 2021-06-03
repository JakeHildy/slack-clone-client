import React, { useState, useContext, useEffect } from "react";
import "./CurrentRoom.scss";
import NSSocketContext from "./../../context/nsSocket";
import Message from "./../Message/Message";

function CurrentRoom() {
  const nsSocket = useContext(NSSocketContext);
  const [messages, setMessages] = useState([
    {
      username: "rbunch",
      text: "Does anyone know of any websites that will let you see the traffic and bounce rate of other sites? I'm doing some competitor research and want to have as many data points as possible for the pitch. Much appreciated :pray:",
      time: Date.now(),
      avatar: "http://via.placeholder.com/30",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (nsSocket) {
      nsSocket.on("messageToClients", (msg) => {
        console.log(msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [nsSocket]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newMessage = e.target.message.value;
    nsSocket.emit("newMessageToServer", { text: newMessage });
    e.target.reset();
  };

  return (
    <div className="current-room">
      <div className="current-room__header">
        <h2 className="current-room__title">Current room</h2>
        <span className="current-room__users">Users</span>{" "}
        <span
          className="current-room__users-icon glyphicon glyphicon-user"
          aria-hidden="true"
        ></span>
      </div>

      <ul className="current-room__messages">
        {messages.map((message, i) => {
          return <Message key={i} message={message} />;
        })}
      </ul>
      <form onSubmit={(e) => onFormSubmit(e)} className="form">
        <input
          type="text"
          name="message"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          placeholder="Enter Your Message..."
          className="form__input"
        />
        <button className="form__button">Submit</button>
      </form>
    </div>
  );
}

export default CurrentRoom;
