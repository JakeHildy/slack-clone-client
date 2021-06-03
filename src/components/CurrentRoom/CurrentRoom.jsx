import React, { useState, useContext, useEffect, useRef } from "react";
import "./CurrentRoom.scss";
import NSSocketContext from "./../../context/nsSocket";
import Message from "./../Message/Message";

function CurrentRoom() {
  const nsSocket = useContext(NSSocketContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainer = useRef();

  useEffect(() => {
    if (nsSocket) {
      nsSocket.on("messageToClients", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        scrollToBottomOfMessages();
      });
      nsSocket.on("historyCatchUp", (msg) => {
        setMessages(msg);
        scrollToBottomOfMessages();
      });
    }
  }, [nsSocket]);

  const scrollToBottomOfMessages = () => {
    messagesContainer.current.scrollTo(
      0,
      messagesContainer.current.scrollHeight
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newMessage = e.target.message.value;
    if (newMessage === "") return;
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

      <ul className="current-room__messages" ref={messagesContainer}>
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
