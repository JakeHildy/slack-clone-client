import React, { useState } from "react";
import "./SettingsModal.scss";
import avatarOptions from "./../../data/avatar-options.json";
import DropDown from "./../DropDown/DropDown";
import TextInput from "./../TextInput/TextInput";
import CustomAvatar from "./../CustomAvatar/CustomAvatar";
import DiceIcon from "../Icons/DiceIcon/DiceIcon";

function SettingsModal({ handleShowSettings }) {
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

  const avatarConfig = {
    username,
    topType,
    accessoriesType,
    hairColor,
    facialHairType,
    clotheType,
    eyeType,
    eyebrowType,
    mouthType,
    skinColor,
  };

  const setAvatarFunctions = [
    setTopType,
    setAccessoriesType,
    setHairColor,
    setFacialHairType,
    setClotheType,
    setEyeType,
    setEyebrowType,
    setMouthType,
    setSkinColor,
  ];

  const saveChanges = () => {
    localStorage.setItem("username", username);
  };

  const randomizeAvatar = () => {
    // Create Array of the object keys
    const optionNames = Object.keys(avatarOptions);

    // Loop over the set functions and randomize each one
    setAvatarFunctions.forEach((setFunc, i) => {
      const randomNum = Math.floor(
        Math.random() * avatarOptions[optionNames[i]].length
      );
      setFunc(avatarOptions[optionNames[i]][randomNum]);
    });
  };

  const hideModal = (e) => {
    handleShowSettings(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="settings-modal" onClick={hideModal}>
      <div className="settings-modal__container" onClick={stopPropagation}>
        <h2 className="settings-modal__heading">Settings</h2>
        <p className="settings-modal__close" onClick={hideModal}>
          X
        </p>
        <div className="settings-modal__settings">
          <form className="settings-modal__form">
            <TextInput
              label="username"
              value={username}
              handleChange={setUsername}
            />
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

            <div className="settings-modal__randomize-icon">
              <DiceIcon fill="#bbb" handleClick={randomizeAvatar} />
            </div>
          </form>
          <CustomAvatar avatarConfig={avatarConfig} />
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
