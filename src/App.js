import "./App.scss";
import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";

const ENDPOINT = "http://192.168.1.75:9000";

function App() {
  let socket = useRef(null);
  let socket2 = useRef(null);
  const [messages, setMessages] = useState(["one", "two"]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.current = io(ENDPOINT); // The / namespace
    socket2.current = io(`${ENDPOINT}/admin`); // The admin namespace

    socket.current.on("messageFromServer", (msg) => {
      console.log(msg);
      socket.current.emit("Message from client", {
        data: "message from client",
      });
    });

    socket.current.on("joined", (msg) => {
      console.log(msg);
    });

    socket2.current.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.current.on("messageToClients", (data) => {
      setMessages((oldMessages) => [...oldMessages, data.text]);
    });
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    socket.current.emit("newMessageToServer", { text: newMessage });
  };

  return (
    <div className="app">
      <h1 className="app__heading">Jake's Slack Clone</h1>
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

export default App;
