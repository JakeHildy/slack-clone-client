import React from "react";
import socketio from "socket.io-client";
export const SOCKET_URL = "http://192.168.1.72:9000";

const username = localStorage.getItem("username");

const SocketContext = React.createContext();
SocketContext.displayName = "SocketContext";

export const socket = socketio.connect(SOCKET_URL, {
  query: { username },
});
export default SocketContext;
