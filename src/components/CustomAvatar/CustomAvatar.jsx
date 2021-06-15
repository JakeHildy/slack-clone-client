import React from "react";
import "./CustomAvatar.scss";
import Avatar from "avataaars";

function CustomAvatar({ avatarConfig }) {
  return (
    <div className="avatar">
      <div className="avatar__container">
        <Avatar
          avatarStyle="Circle"
          topType={avatarConfig.topType}
          accessoriesType={avatarConfig.accessoriesType}
          hairColor={avatarConfig.hairColor}
          facialHairType={avatarConfig.facialHairType}
          clotheType={avatarConfig.clotheType}
          clotheColor="Black"
          eyeType={avatarConfig.eyeType}
          eyebrowType={avatarConfig.eyebrowType}
          mouthType={avatarConfig.mouthType}
          skinColor={avatarConfig.skinColor}
          width="132px"
        />
      </div>
      <h3 className="avatar__username">{avatarConfig.username}</h3>
    </div>
  );
}

export default CustomAvatar;
