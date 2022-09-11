import React from "react";
import AvatarComment from "./AvatarComment";
import CommentList from "./CommentList";
import { CommentContainer, Wrapper } from "./styles";

const Comments = ({ comment }) => {
  return (
    <CommentContainer>
      <Wrapper>
        <AvatarComment user={comment?.user} />

        <CommentList comment={comment} />
      </Wrapper>
    </CommentContainer>
  );
};

export default Comments;
