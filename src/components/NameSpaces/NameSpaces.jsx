import React, { useContext, useEffect, useState } from "react";
import SocketContext from "./../../context/socket";
import NSSocketContext from "./../../context/nsSocket";
import "./NameSpaces.scss";

function NameSpaces({ updateNamespace }) {
  const [nsData, setNsData] = useState(null);
  const socket = useContext(SocketContext);
  const nsSocket = useContext(NSSocketContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    socket &&
      socket.on("nsList", (nsData) => {
        setNsData(nsData);
        setLoaded(true);
        // console.log(nsData[0].endpoint);
        updateNamespace(nsData[0].endpoint);
      });

    return () => {
      socket && socket.off("nsList");
    };
  }, [socket]);

  const connectToNS = (e) => {
    const nsEndpoint = e.target.getAttribute("ns");
    updateNamespace(nsEndpoint);
  };

  if (loaded) {
    return (
      <div className="namespaces">
        {nsData.map((namespace, i) => {
          const currentNS = namespace.endpoint === nsSocket.nsp;
          return (
            <div
              key={i}
              className={`namespace ${
                currentNS ? "namespace--highlighted" : ""
              }`}
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
