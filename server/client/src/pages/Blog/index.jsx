import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Loading from "../../components/Loading";
import {
  BlogContent,
  Image,
  ImageContainer,
  TopContent,
  Wrapper,
} from "./styles";
import Footer from "../../components/Footer";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(blog);

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/api/blog/${id}`);
        setBlog(data);
        setLoading(false);
        setError("");
      } catch (error) {
        setLoading(false);
        setError(
          error?.response && error.response?.data?.message
            ? error.response?.data?.message
            : error?.message
        );
      }
    };
    getBlog();
  }, [id]);
  return (
    <>
    <Wrapper>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {blog && (
            <BlogContent>
              <ImageContainer>
                <Image src={blog.thumbnail} />
              </ImageContainer>
              <TopContent>
                <h3>{blog.title}</h3>
                <p>
                  By: <span>{blog.user.name}</span>{" "}
                </p>
              </TopContent>

              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }}
              ></div>
            </BlogContent>
          )}
        </>
      )}
    </Wrapper>
    <Footer/></>
  );
};

export default Blog;
