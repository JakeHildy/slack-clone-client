import React, { useState, useContext, useEffect } from "react";
import NSSocketContext from "./../../context/nsSocket";
import "./Rooms.scss";

function Rooms() {
  const [roomData, setRoomData] = useState(null);
  const nsSocket = useContext(NSSocketContext);
  const [loaded, setLoaded] = useState(false);

  const joinRoom = (e) => {
    e.preventDefault();
    console.log("join room clicked");
  };

  useEffect(() => {
    if (nsSocket) {
      nsSocket.on("nsRoomLoad", (nsRooms) => {
        setRoomData(nsRooms);
        setLoaded(true);
      });
    }
  }, [nsSocket]);

  if (loaded) {
    return (
      <div className="rooms">
        <h3 className="rooms__title">Rooms</h3>

        <ul className="rooms__list">
          {roomData.map((room, i) => {
            return (
              <li
                key={i}
                className="rooms__list-item"
                onClick={(e) => joinRoom(e)}
              >
                <span
                  className={`rooms__icon glyphicon glyphicon-${
                    room.privateRoom ? "lock" : "globe"
                  }`}
                  aria-hidden="true"
                >
                  {" "}
                </span>
                {room.roomTitle}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Rooms;
