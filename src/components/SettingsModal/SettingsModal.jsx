import React, { useState } from "react";
import Avatar from "avataaars";
import "./SettingsModal.scss";
import avatarOptions from "./../../data/avatar-options.json";

function SettingsModal() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [topType, setTopType] = useState(
    localStorage.getItem("topType") || "NoHair"
  );

  const saveChanges = () => {
    localStorage.setItem("username", username);
  };

  return (
    <div className="settings-modal">
      <div className="settings-modal__container">
        <h2 className="settings-modal__heading">Settings</h2>
        <form className="settings-modal__form">
          <div className="settings-modal__form--top">
            {" "}
            <label htmlFor="username" className="settings-modal__form--label">
              Username:
            </label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="settings-modal__form--username"
            />
          </div>
          <div className="settings-modal__form--bottom">
            <label htmlFor="toptype" className="settings-modal__form--label">
              topType
            </label>
            <select
              id="topType"
              name="topType"
              value={topType}
              onChange={(e) => setTopType(e.target.value)}
              className="settings-modal__form--select"
            >
              {avatarOptions.topType.map((option, i) => {
                return (
                  <option key={i} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div className="settings-modal__avatar">
          <Avatar
            avatarStyle="Circle"
            topType={topType}
            accessoriesType="Round"
            hairColor="SilverGray"
            facialHairType="Blank"
            clotheType="Overall"
            clotheColor="Black"
            eyeType="Squint"
            eyebrowType="RaisedExcited"
            mouthType="Grimace"
            skinColor="Tanned"
            width="132px"
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
