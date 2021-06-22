import React from "react";
import "./CustomAvatarSmall.scss";
import Avatar from "avataaars";

function CustomAvatar({ avatarConfig }) {
  return (
    <div className="avatar-small">
      <div className="avatar-small__container">
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
    </div>
  );
}

export default CustomAvatar;
