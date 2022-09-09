import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BlogEditor, BlogPriview, Footer } from "../../components";

import BlogFrom from "../../components/BlogForm";
import { createBlog, updateBlog } from "../../redux/actions/blogActions";
import {
  CREATE_BLOG_RESET,
  UPDATE_BLOG_RESET,
} from "../../redux/constants/blogConstants";
import { shallowEqual } from "../../utils/validRegister";
import axios from "axios";
import {
  Container,
  Wrapper,
  TopContent,
  RightPriview,
  PreviewContent,
  SubmitButton,
} from "./styles";
import { BASE_URL } from "../../api/api";

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
  const {
    error,
    createBlog: createBlogSuccess,
    loading,
  } = useSelector((state) => state.createBlog);

  const {
    updateBlog: updateBlogData,
    error: updateBlogErrror,
    loading: updateLoading,
  } = useSelector((state) => state.updateBlog);

  const { error: uploadError, success } = blog;

  useEffect(() => {
    if (!id) return;

    const getBlog = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/blog/${id}`);

        console.log(data, "data");
        setBlog(data);
        setBody(data.content);
        setOldData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBlog();

    const initData = {
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

    return () => {
      setBlog(initData);
      setBody("");
      setOldData(initData);
    };
  }, [id]);

  // set the editor text
  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText;
    setText(text);
  }, [body]);

  const handleSubmit = async () => {
    let newData = { ...blog, content: body };

    if (id) {
      if (blog.user._id === userInfo?.user?._id) {
        const result = shallowEqual(oldData, newData);

        if (result) {
          return setBlog({ ...blog, error: "The data does not change." });
        }

        dispatch(updateBlog(newData, userInfo?.access_token, id));
      }
    } else {
      dispatch(createBlog(newData, userInfo?.access_token));
    }
  };

  useEffect(() => {
    if (error || uploadError || updateBlogErrror) {
      dispatch({ type: CREATE_BLOG_RESET });
      dispatch({ type: UPDATE_BLOG_RESET });
      addToast(error || uploadError || updateBlogErrror, {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (createBlogSuccess?.message || updateBlogData?.message) {
      dispatch({ type: CREATE_BLOG_RESET });
      dispatch({ type: UPDATE_BLOG_RESET });
      addToast(createBlogSuccess?.message || updateBlogData?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [
    error,
    addToast,
    success,
    createBlogSuccess?.message,
    uploadError,
    dispatch,
    updateBlogData?.message,
    updateBlogErrror,
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
              <button onClick={handleSubmit}>
                {loading || updateLoading ? (
                  "Loading..."
                ) : (
                  <>{id ? "Update Post" : "Create Post"}</>
                )}
              </button>
            </SubmitButton>
          </div>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default CreateBlog;
