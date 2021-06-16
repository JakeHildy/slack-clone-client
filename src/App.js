import "./App.scss";
import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import SocketContext, { socket, SOCKET_URL } from "./context/socket";
import NSSocketContext from "./context/nsSocket";
import NameSpaces from "./components/NameSpaces/NameSpaces";
import Rooms from "./components/Rooms/Rooms";
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";
import NavBar from "./components/NavBar/NavBar";
import SettingsModal from "./components/SettingsModal/SettingsModal";
import LoginModal from "./components/LoginModal/LoginModal";
import { checkIfLoggedIn } from "./utils/loginUtils";

function App() {
  const [nsSocket, setNsSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(checkIfLoggedIn());
  const [ns, setNs] = useState("/wiki");

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      let username = prompt("What is your username?");
      localStorage.setItem("username", username);
      window.location.reload();
    }
  }, []);

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

  const handleShowSettings = (show) => {
    setShowSettings(show);
  };

  return (
    <SocketContext.Provider value={socket}>
      <NSSocketContext.Provider value={nsSocket}>
        <div className="app">
          <NavBar handleOpenSettings={() => handleShowSettings(true)} />
          <div className="app__main">
            <NameSpaces updateNamespace={updateNamespace} />
            <Rooms updateRoom={updateRoom} roomName={currentRoom} />
            <div className="app__current-room">
              <CurrentRoom roomName={currentRoom} />
            </div>
          </div>
          {showSettings && (
            <SettingsModal handleShowSettings={handleShowSettings} />
          )}
          {showLogin && <LoginModal />}
        </div>
      </NSSocketContext.Provider>
    </SocketContext.Provider>
  );
}

export default App;
