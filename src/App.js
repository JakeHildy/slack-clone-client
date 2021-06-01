import "./App.scss";
import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import SocketContext, { socket } from "./context/socket";
import NameSpaces from "./components/NameSpaces/NameSpaces";
import Rooms from "./components/Rooms/Rooms";
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";

function App() {
  // let socket = useRef(null);
  // let socket2 = useRef(null);

  useEffect(() => {
    // socket.current = io(ENDPOINT); // The / namespace
    // socket2.current = io(`${ENDPOINT}/wiki`); // The admin namespace
    // socket.current.on("messageFromServer", (msg) => {
    //   console.log(msg);
    //   socket.current.emit("Message from client", {
    //     data: "message from client",
    //   });
    // });
    // socket.current.on("joined", (msg) => {
    //   console.log(msg);
    // });
    // socket2.current.on("welcome", (msg) => {
    //   console.log(msg);
    // });
    // socket.current.on("messageToClients", (data) => {
    // setMessages((oldMessages) => [...oldMessages, data.text]);
    // });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <div className="app">
        <NameSpaces />
        <Rooms />
        <div className="app__current-room">
          <CurrentRoom />
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
