import React from "react";
// import socketio from "socket.io-client";
// export const SOCKET_URL = "http://192.168.1.72:9000";

// const id = sessionStorage.getItem("id");

const SocketContext = React.createContext();
SocketContext.displayName = "SocketContext";

// export const socket = socketio.connect(SOCKET_URL, {
//   query: { id },
// });
export default SocketContext;
