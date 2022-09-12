import React from "react";
import AvatarComment from "./AvatarComment";
import CommentList from "./CommentList";
import { Wrapper } from "./styles";

const Comments = ({ comment }) => {
  return (
    <Wrapper>
      <AvatarComment user={comment?.user} />

      <CommentList comment={comment} />
    </Wrapper>
  );
};

export default Comments;
