import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommentEditor from "../CommentEditor";
import { CommentBox } from "./styles";

const InputComment = ({ callback }) => {
  const [body, setBody] = useState("");
  const divRef = useRef(null);

  const { createComment, loading } = useSelector(
    (state) => state.createComment
  );
  console.log(createComment);

  const handleSubmit = () => {
    const div = divRef.current;
    const text = div?.innerText;
    if (!text.trim()) return;

    callback(body);

    setBody("");
  };

  return (
    <CommentBox>
      <CommentEditor body={body} setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <button className="submit-button" onClick={handleSubmit}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </CommentBox>
  );
};

export default InputComment;
