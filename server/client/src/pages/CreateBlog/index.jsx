import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BlogEditor, BlogPriview, Footer } from "../../components";

import BlogFrom from "../../components/BlogForm";
import { createBlog } from "../../redux/actions/blogActions";
import { CREATE_BLOG_RESET } from "../../redux/constants/blogConstants";
import { shallowEqual } from "../../utils/validRegister";

import {
  Container,
  Wrapper,
  TopContent,
  RightPriview,
  PreviewContent,
  SubmitButton,
} from "./styles";

const CreateBlog = ({ id }) => {
  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
    error: "",
    success: "",
  };
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(initState);
  const [body, setBody] = useState("");
  const [oldData, setOldData] = useState(initState);

  const divRef = useRef(null);
  const [text, setText] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const { error, createBlog: createBlogSuccess } = useSelector(
    (state) => state.createBlog
  );
  const { error: uploadError, success } = blog;
  // set the editor text
  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText;
    setText(text);
  }, [body]);

  const handleSubmit = async () => {
    let newData = { ...blog, content: body };

    dispatch(createBlog(newData, userInfo?.access_token));
  };

  useEffect(() => {
    if (error || uploadError) {
      dispatch({ type: CREATE_BLOG_RESET });
      addToast(error || uploadError, {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (createBlogSuccess?.message) {
      dispatch({ type: CREATE_BLOG_RESET });
      addToast(createBlogSuccess?.message, {
        appearance: "success",
        autoDismiss: true,
      });

      setBlog({
        user: "",
        title: "",
        content: "",
        description: "",
        thumbnail: "",
        category: "",
        createdAt: "",
        error: "",
        success: "",
      });
    }
  }, [
    error,
    addToast,
    success,
    createBlogSuccess?.message,
    uploadError,
    dispatch,
  ]);

  return (
    <>
      <Container>
        <Wrapper>
          <TopContent>
            <BlogFrom blog={blog} setBlog={setBlog} />
            <RightPriview>
              <PreviewContent>
                <h2>Preview</h2>
                <div className="content">
                  <BlogPriview blog={blog} />
                </div>
              </PreviewContent>
            </RightPriview>
          </TopContent>
          <div>
            <BlogEditor
              setBlog={setBlog}
              blog={blog}
              setBody={setBody}
              body={body}
            />
            <div
              ref={divRef}
              dangerouslySetInnerHTML={{
                __html: body,
              }}
              style={{ display: "none" }}
            />
            <small>{text.length}</small>
            <SubmitButton>
              <button onClick={handleSubmit}>Create Blog</button>
            </SubmitButton>
          </div>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default CreateBlog;
