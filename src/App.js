import "./App.scss";
import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import SocketContext, { socket, SOCKET_URL } from "./context/socket";
import NSSocketContext from "./context/nsSocket";
import NameSpaces from "./components/NameSpaces/NameSpaces";
import Rooms from "./components/Rooms/Rooms";
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";

function App() {
  const [nsSocket, setNsSocket] = useState(null);
  const [ns, setNs] = useState("/wiki");

  useEffect(() => {
    setNsSocket(socketio(`${SOCKET_URL}${ns}`));
    console.log(`Connecting to ${ns}`);
  }, [ns]);

  const updateNamespace = (ns) => {
    setNs(ns);
  };

  return (
    <SocketContext.Provider value={socket}>
      <NSSocketContext.Provider value={nsSocket}>
        <div className="app">
          <NameSpaces updateNamespace={updateNamespace} />
          <Rooms />
          <div className="app__current-room">
            <CurrentRoom />
          </div>
        </div>
      </NSSocketContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
