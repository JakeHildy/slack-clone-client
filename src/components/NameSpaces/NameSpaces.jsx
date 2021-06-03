import React, { useContext, useEffect, useState } from "react";
import SocketContext from "./../../context/socket";
import NSSocketContext from "./../../context/nsSocket";
import "./NameSpaces.scss";

function NameSpaces({ updateNamespace }) {
  const socket = useContext(SocketContext);
  const nsSocket = useContext(NSSocketContext);
  const [nsData, setNsData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    socket.on("nsList", (nsData) => {
      setNsData(nsData);
      setLoaded(true);
    });
    return () => {
      socket.off("nsList");
    };
  }, [socket]);

  useEffect(() => {
    if (nsSocket) {
      nsSocket.on("nsRoomLoad", (nsRoomData) => {
        console.log(nsRoomData);
        setRoomData(nsRoomData);
      });
    }
  }, [nsSocket]);

  const connectToNS = (e) => {
    const nsEndpoint = e.target.getAttribute("ns");
    updateNamespace(nsEndpoint);
  };

  if (loaded) {
    return (
      <div className="namespaces">
        {nsData.map((namespace, i) => {
          return (
            <div
              key={i}
              className="namespace"
              ns={namespace.endpoint}
              onClick={(e) => connectToNS(e)}
            >
              <img
                src={namespace.img}
                alt="Select Namespace"
                className="namespace__img"
                ns={namespace.endpoint}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default NameSpaces;
