import React from "react";
import socketio from "socket.io-client";
export const SOCKET_URL = "http://192.168.1.75:9000";

let username = prompt("What is your username?");
while (!username) {
  username = prompt("Invalid username. What is your username?");
}

const SocketContext = React.createContext();
SocketContext.displayName = "SocketContext";

export const socket = socketio.connect(SOCKET_URL, {
  query: { username },
});
export default SocketContext;
