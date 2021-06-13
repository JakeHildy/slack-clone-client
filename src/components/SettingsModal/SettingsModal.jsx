import React, { useState } from "react";
import Avatar from "avataaars";
import "./SettingsModal.scss";
import avatarOptions from "./../../data/avatar-options.json";
import DropDown from "./../DropDown/DropDown";

function SettingsModal() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [topType, setTopType] = useState(avatarOptions.topType[0]);
  const [accessoriesType, setAccessoriesType] = useState(
    avatarOptions.accessoriesType[0]
  );
  const [hairColor, setHairColor] = useState(avatarOptions.hairColor[0]);
  const [facialHairType, setFacialHairType] = useState(
    avatarOptions.facialHairType[0]
  );
  const [clotheType, setClotheType] = useState(avatarOptions.clotheType[0]);
  const [eyeType, setEyeType] = useState(avatarOptions.eyeType[0]);
  const [eyebrowType, setEyebrowType] = useState(avatarOptions.eyebrowType[0]);
  const [mouthType, setMouthType] = useState(avatarOptions.mouthType[0]);
  const [skinColor, setSkinColor] = useState(avatarOptions.skinColor[0]);

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
        </form>
        <div className="settings-modal__form--bottom">
          <DropDown
            label="topType"
            value={topType}
            options={avatarOptions.topType}
            handleChange={setTopType}
          />
          <DropDown
            label="accessoriesType"
            value={accessoriesType}
            options={avatarOptions.accessoriesType}
            handleChange={setAccessoriesType}
          />
          <DropDown
            label="hairColor"
            value={hairColor}
            options={avatarOptions.hairColor}
            handleChange={setHairColor}
          />
          <DropDown
            label="facialHairType"
            value={facialHairType}
            options={avatarOptions.facialHairType}
            handleChange={setFacialHairType}
          />
          <DropDown
            label="clotheType"
            value={clotheType}
            options={avatarOptions.clotheType}
            handleChange={setClotheType}
          />
          <DropDown
            label="eyeType"
            value={eyeType}
            options={avatarOptions.eyeType}
            handleChange={setEyeType}
          />
          <DropDown
            label="eyebrowType"
            value={eyebrowType}
            options={avatarOptions.eyebrowType}
            handleChange={setEyebrowType}
          />
          <DropDown
            label="mouthType"
            value={mouthType}
            options={avatarOptions.mouthType}
            handleChange={setMouthType}
          />
          <DropDown
            label="skinColor"
            value={skinColor}
            options={avatarOptions.skinColor}
            handleChange={setSkinColor}
          />
          <div className="settings-modal__avatar">
            <Avatar
              avatarStyle="Circle"
              topType={topType}
              accessoriesType={accessoriesType}
              hairColor={hairColor}
              facialHairType={facialHairType}
              clotheType={clotheType}
              clotheColor="Black"
              eyeType={eyeType}
              eyebrowType={eyebrowType}
              mouthType={mouthType}
              skinColor={skinColor}
              width="132px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
