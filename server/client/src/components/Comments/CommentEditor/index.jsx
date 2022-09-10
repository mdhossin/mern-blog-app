import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Wrapper } from "./styles";

const CommentEditor = ({ body, setBody }) => {
  const modules = { toolbar: { container } };
  return (
    <Wrapper>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        value={body}
      />
    </Wrapper>
  );
};

let container = [
  [{ font: [] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block", "link"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
];

export default CommentEditor;
