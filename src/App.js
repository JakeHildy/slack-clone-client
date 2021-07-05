import "./App.scss";
import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import SocketContext from "./context/socket";
import NSSocketContext from "./context/nsSocket";
import UserContext from "./context/userContext";
import NameSpaces from "./components/NameSpaces/NameSpaces";
import Rooms from "./components/Rooms/Rooms";
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";
import NavBar from "./components/NavBar/NavBar";
import SettingsModal from "./components/SettingsModal/SettingsModal";
import LoginModal from "./components/LoginModal/LoginModal";
import { setSessionStorage } from "./utils/loginUtils";
import { isLoggedIn, clearSessionStorage } from "./utils/loginUtils";
import { getUser, getUserPublic } from "./utils/userAPI";
const SOCKET_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [socket, setSocket] = useState(null);
  const [nsSocket, setNsSocket] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showLogin, setShowLogin] = useState(!isLoggedIn());
  const [ns, setNs] = useState(null);

  useEffect(() => {
    // === APP START ===
    // check for userId & authToken in session storage.
    const userId = sessionStorage.getItem("userId");
    const authToken = sessionStorage.getItem("authToken");
    if (!userId || !userId) {
      // if no id or token, clear storage and force user to login.
      clearSessionStorage();
      setShowLogin(true);
    } else {
      // otherwise, attempt to get user info from backend.
      getUserInfo(userId, authToken);
      connectToMainSocket();
    }
  }, []);

  const getUserInfo = async (id, token) => {
    // Attempt to get the user info using the id and token.
    try {
      const response = await getUser(id, token);
      const { avatarConfig, username } = response;
      // if successfull populate userData into the UserContext.
      setUserData({ avatarConfig, username });
      // connectToMainSocket();
    } catch (err) {
      // if there was an error clear session storage and force login.
      console.log("Error Getting User info", err);
      clearSessionStorage();
      setShowLogin(true);
    }
  };

  ////////////////////////////////////////////////////////
  // === MAIN SOCKET ===
  const connectToMainSocket = () => {
    // console.log("attempt connection to main socket");
    setSocket(
      socketio.connect(SOCKET_URL, {
        query: { id: sessionStorage.getItem("userId") },
      })
    );
  };

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on("nsList", (nsData) => {
  //     console.log(nsData);
  //   });
  // }, [socket]);

  useEffect(() => {
    if (nsSocket) {
      nsSocket.close();
    }
    setNsSocket(
      socketio.connect(`${SOCKET_URL}${ns}`, {
        query: { id: sessionStorage.getItem("userId") },
      })
    );
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

  const handleLogin = (userData) => {
    setSessionStorage(userData.token, userData.userId);
    setShowLogin(false);
    setUserData(userData);
    connectToMainSocket();
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
              handleOpenSettings={() => setShowSettings(true)}
              handleLogout={handleLogout}
            />
            <div className="app__main">
              {!showLogin && (
                <>
                  <NameSpaces updateNamespace={updateNamespace} />
                  <Rooms updateRoom={updateRoom} roomName={currentRoom} />
                  <div className="app__current-room">
                    <CurrentRoom roomName={currentRoom} />
                  </div>
                </>
              )}
            </div>
            {showSettings && (
              <SettingsModal handleShowSettings={setShowSettings} />
            )}
            {showLogin && <LoginModal />}
          </div>
        </NSSocketContext.Provider>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
