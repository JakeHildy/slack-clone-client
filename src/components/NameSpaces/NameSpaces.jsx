import React, { useContext, useEffect, useState } from "react";
import SocketContext from "./../../context/socket";
import "./NameSpaces.scss";

function NameSpaces() {
  const socket = useContext(SocketContext);
  const [nsData, setNsData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    socket.on("nsList", (nsData) => {
      setNsData(nsData);
      setLoaded(true);
    });
  }, []);

  if (loaded) {
    return (
      <div className="namespaces">
        {nsData.map((namespace, i) => {
          return (
            <div key={i} className="namespace" ns={namespace.endpoint}>
              <img
                src={namespace.img}
                alt="Select Namespace"
                className="namespace__img"
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
