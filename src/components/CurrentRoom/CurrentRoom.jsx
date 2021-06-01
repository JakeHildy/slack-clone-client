import React, { useState } from "react";
import "./CurrentRoom.scss";
import Message from "./../Message/Message";

function CurrentRoom() {
  const [messages, setMessages] = useState([
    { user: "Ian Yu", text: "I went running today", timestamp: Date.now() },
    {
      user: "rbunch",
      text: "Does anyone know of any websites that will let you see the traffic and bounce rate of other sites? I'm doing some competitor research and want to have as many data points as possible for the pitch. Much appreciated :pray:",
      timestamp: Date.now(),
    },
    {
      user: "Camille Naidoo",
      text: "Hey everyone! Climate Mind is looking for dev volunteers to join our team and help build a tool that allows users to have meaningful and productive conversations about climate change. If you're interested and have a few hours a week to dedicate to this Stanford-affiliated non-profit project, please reach out!",
      timestamp: Date.now(),
    },
    {
      user: "Karli Gresley-Babe",
      text: "I love Jake so so so so so smuch!!!!!!",
      timestamp: Date.now(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    // socket.current.emit("newMessageToServer", { text: newMessage });
  };

  return (
    <div className="current-room">
      <div className="current-room__header">
        <h2 className="current-room__title">Current room</h2>
        <span className="current-room__users">Users</span>{" "}
        <span
          className="current-room__users glyphicon glyphicon-user"
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
