import React from "react";
import { CommentInfo } from "./styles";

const CommentList = ({ comment }) => {
  return (
    <CommentInfo>
      <h5>{comment.user.name}</h5>
      <div className="comment_box">
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: comment.content,
          }}
        />

        <div className="reply-button">
          <small className="reply">- Reply -</small>

          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      </div>
    </CommentInfo>
  );
};

export default CommentList;
