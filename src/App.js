import "./App.scss";
import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import NameSpaces from "./components/NameSpaces/NameSpaces";
import Rooms from "./components/Rooms/Rooms";
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";

const ENDPOINT = "http://192.168.1.75:9000";

function App() {
  let socket = useRef(null);
  let socket2 = useRef(null);

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
      // setMessages((oldMessages) => [...oldMessages, data.text]);
    });
  }, []);

  return (
    <div className="app">
      <NameSpaces />
      <Rooms />
      <div className="app__current-room">
        <CurrentRoom />
      </div>
    </div>
  );
}

export default App;
