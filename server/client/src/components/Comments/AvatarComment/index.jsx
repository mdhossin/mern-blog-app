import React from "react";

import { UserInfo } from "./styles";

const AvatarComment = ({ user }) => {
  return (
    <UserInfo>
      <img src={user.avatar} alt="avatar" />
    </UserInfo>
  );
};

export default AvatarComment;
