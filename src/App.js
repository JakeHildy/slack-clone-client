import "./App.scss";
import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import SocketContext, { socket, SOCKET_URL } from "./context/socket";
import NSSocketContext from "./context/nsSocket";
import UserContext from "./context/userContext";
import NameSpaces from "./components/NameSpaces/NameSpaces";
import Rooms from "./components/Rooms/Rooms";
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";
import NavBar from "./components/NavBar/NavBar";
import SettingsModal from "./components/SettingsModal/SettingsModal";
import LoginModal from "./components/LoginModal/LoginModal";
import { isLoggedIn, clearSessionStorage } from "./utils/loginUtils";
import { getUserPublic } from "./utils/userAPI";

function App() {
  const [nsSocket, setNsSocket] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(!isLoggedIn());
  const [ns, setNs] = useState("/wiki");

  useEffect(async () => {
    const userId = sessionStorage.getItem("id");
    if (userId) {
      const userData = await getUserPublic(userId);
      const { avatarConfig, username } = userData.user;
      setUserData({ userId, username, avatarConfig });
    }
  }, []);

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

  const handleShowLogin = (show) => {
    setShowLogin(show);
  };

  const handleLogin = (userData) => {
    console.log("handling login in app");
    setUserData(userData);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setShowLogin(true);
    clearSessionStorage();
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{ userData: userData, onLoggedIn: handleLogin }}
    >
      <SocketContext.Provider value={socket}>
        <NSSocketContext.Provider value={nsSocket}>
          <div className="app">
            <NavBar
              handleOpenSettings={() => handleShowSettings(true)}
              handleLogout={handleLogout}
            />
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
            {showLogin && <LoginModal handleShowLogin={handleShowLogin} />}
          </div>
        </NSSocketContext.Provider>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
