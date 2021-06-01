import React from "react";
import "./Rooms.scss";

function Rooms() {
  const joinRoom = (e) => {
    e.preventDefault();
    console.log("join room clicked");
  };

  return (
    <div className="rooms">
      <h3 className="rooms__title">Rooms</h3>
      <ul className="rooms__list">
        <li className="rooms__list-item" onClick={(e) => joinRoom(e)}>
          <span
            className="rooms__icon glyphicon glyphicon-lock"
            aria-hidden="true"
          >
            {" "}
          </span>
          Main Room
        </li>
        <li className="rooms__list-item" onClick={(e) => joinRoom(e)}>
          <span
            className="rooms__icon glyphicon glyphicon-globe"
            aria-hidden="true"
          >
            {" "}
          </span>
          Meeting Room Room
        </li>
      </ul>
    </div>
  );
}

export default Rooms;
