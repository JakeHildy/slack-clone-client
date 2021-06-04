import React, { useState, useContext, useEffect, useRef } from "react";
import "./CurrentRoom.scss";
import NSSocketContext from "./../../context/nsSocket";
import Message from "./../Message/Message";

function CurrentRoom({ roomName }) {
  const nsSocket = useContext(NSSocketContext);
  const [messages, setMessages] = useState([]);
  const [searchStr, setsearchStr] = useState("");
  const [numUsers, setnumUsers] = useState(0);
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
      nsSocket.on("updateMembers", (numUsers) => {
        setnumUsers(numUsers);
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

  const onSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="current-room">
      <div className="current-room__header">
        <div className="current-room__header--left">
          <h2 className="current-room__title">{roomName}</h2>
          <span className="current-room__users">{`Users ${numUsers}`}</span>{" "}
          <span
            className="current-room__users-icon glyphicon glyphicon-user"
            aria-hidden="true"
          ></span>
        </div>

        <div className="current-room__header--right">
          <form onSubmit={onSearchSubmit} className="search-form">
            <input
              type="text"
              name="search"
              onChange={(e) => setsearchStr(e.target.value)}
              placeholder="Search..."
              className="search-form__input"
            />
            <span
              className="search-form__icon glyphicon glyphicon-search"
              aria-hidden="true"
            ></span>
          </form>
        </div>
      </div>

      <ul className="current-room__messages" ref={messagesContainer}>
        {messages
          .filter((message) => {
            return (
              message.text.toLowerCase().includes(searchStr.toLowerCase()) ||
              message.username.toLowerCase().includes(searchStr.toLowerCase())
            );
          })
          .map((message, i) => {
            return <Message key={i} message={message} />;
          })}
      </ul>
      <form onSubmit={(e) => onFormSubmit(e)} className="form">
        <input
          type="text"
          name="message"
          placeholder="Enter Your Message..."
          className="form__input"
        />
        <button className="form__button">Submit</button>
      </form>
    </div>
  );
}

export default CurrentRoom;
