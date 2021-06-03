import React from "react";
import socketio from "socket.io-client";
export const SOCKET_URL = "http://192.168.1.75:9000";

const SocketContext = React.createContext();
SocketContext.displayName = "SocketContext";

export const socket = socketio.connect(SOCKET_URL);
export default SocketContext;
