import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogEditor, BlogPriview, Footer } from "../../components";

import BlogFrom from "../../components/BlogForm";

import {
  Container,
  Wrapper,
  TopContent,
  RightPriview,
  PreviewContent,
  SubmitButton,
} from "./styles";

const CreateBlog = () => {
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

  const [blog, setBlog] = useState(initState);
  const [body, setBody] = useState("");
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
          <BlogEditor
            setBlog={setBlog}
            blog={blog}
            setBody={setBody}
            body={body}
          />

          <SubmitButton>
            <button>Create Blog</button>
          </SubmitButton>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default CreateBlog;
