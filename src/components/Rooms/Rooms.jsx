import React, { useState, useContext, useEffect } from "react";
import NSSocketContext from "./../../context/nsSocket";
import "./Rooms.scss";

function Rooms({ updateRoom, roomName }) {
  const [roomData, setRoomData] = useState(null);
  const nsSocket = useContext(NSSocketContext);
  const [loaded, setLoaded] = useState(false);

  // Join Room automatically first time
  useEffect(() => {
    if (roomData) {
      const topRoomName = roomData[0].roomTitle;
      joinRoom(topRoomName);
    }
  }, [roomData]);

  const handleRoomClicked = (e) => {
    e.preventDefault();
    // console.log(`Someone clicked on ${e.target.innerText}`);
    const roomName = e.target.innerText;
    joinRoom(roomName);
  };

  const joinRoom = (roomName) => {
    // Send the roomName to the server!
    nsSocket.emit("joinRoom", roomName);
    updateRoom(roomName);
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
            const glyph = room.privateRoom ? "lock" : "globe";
            const highlighted =
              room.roomTitle === roomName
                ? "rooms__list-item--current-room"
                : "";
            return (
              <li
                key={i}
                className={`rooms__list-item ${highlighted}`}
                onClick={(e) => handleRoomClicked(e)}
              >
                <span
                  className={`rooms__icon glyphicon glyphicon-${glyph}`}
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
