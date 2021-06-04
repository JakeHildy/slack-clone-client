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
  const [currentRoom, setCurrentRoom] = useState("");
  const [ns, setNs] = useState("/wiki");

  useEffect(() => {
    if (nsSocket) {
      nsSocket.close();
    }
    setNsSocket(socketio(`${SOCKET_URL}${ns}`));
  }, [ns]);

  const updateNamespace = (ns) => {
    setNs(ns);
  };

  const updateRoom = (room) => {
    setCurrentRoom(room);
  };

  return (
    <SocketContext.Provider value={socket}>
      <NSSocketContext.Provider value={nsSocket}>
        <div className="app">
          <NameSpaces updateNamespace={updateNamespace} />
          <Rooms updateRoom={updateRoom} roomName={currentRoom} />
          <div className="app__current-room">
            <CurrentRoom roomName={currentRoom} />
          </div>
        </div>
      </NSSocketContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
