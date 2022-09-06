import axios from "axios";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BASE_URL } from "../../api/api";
import { Wrapper } from "./styles";

const BlogEditor = ({ setBody, body, blog, setBlog }) => {
  const quillRef = useRef(null);
  const modules = { toolbar: { container } };
  const { addToast } = useToasts();
  const { error, message } = blog;

  const [loading, setLoading] = useState(false);
  const { access_token } = useSelector((state) => state.user?.userInfo);

  // Custom image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      try {
        const files = input.files;
        if (!files)
          return setBlog({
            ...blog,
            error: "File does not exist.",
            success: "",
          });
        const file = files[0];
        if (!file)
          return setBlog({
            ...blog,
            error: "No files were uploaded.",
            success: "",
          });

        if (file.size > 1024 * 1024)
          return setBlog({ ...blog, error: "Size too large.", success: "" });

        if (file.type !== "image/jpeg" && file.type !== "image/png")
          return setBlog({
            ...blog,
            error: "File format is incorrect.",
            success: "",
          });

        let formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        const res = await axios.post(`${BASE_URL}/api/upload_image`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: access_token,
          },
        });
        setLoading(false);
        const quill = quillRef.current;
        const range = quill?.getEditor().getSelection()?.index;
        if (range !== undefined) {
          quill?.getEditor().insertEmbed(range, "image", `${res.data.url}`);
        }

        setBlog({
          ...blog,
          success: res.data.message,
          error: "",
        });
      } catch (error) {
        setLoading(false);
        setBlog({
          ...blog,
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          success: "",
        });
      }
    };
  }, [access_token, blog, setBlog]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <Wrapper>
      <h2>Content</h2>
      <ReactQuill
        modules={modules}
        placeholder="Write somethings..."
        theme="snow"
        onChange={(e) => setBody(e)}
        value={body}
        ref={quillRef}
      />

      {/* <small>{blog.description.length}/200</small> */}
    </Wrapper>
  );
};

let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

export default BlogEditor;
