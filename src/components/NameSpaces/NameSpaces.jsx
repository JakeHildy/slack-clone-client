import React, { useContext, useEffect } from "react";
import SocketContext from "./../../context/socket";
import "./NameSpaces.scss";
import IconWikipedia from "./../../assets/icons/wikipedia-icon.svg";
import IconFireFox from "./../../assets/icons/firefox-icon.png";
import IconLinux from "./../../assets/icons/linux-icon.png";

function NameSpaces() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("messageFromServer", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="namespaces">
      <div className="namespace" ns="/wiki">
        <img
          src={IconWikipedia}
          alt="Wikipedia Namespace"
          className="namespace__img"
        />
      </div>
      <div className="namespace" ns="/firefox">
        <img
          src={IconFireFox}
          alt="Firefox Namespace"
          className="namespace__img"
        />
      </div>
      <div className="namespace" ns="/linux">
        <img
          src={IconLinux}
          alt="Wikipedia Namespace"
          className="namespace__img"
        />
      </div>
    </div>
  );
}

export default NameSpaces;
