import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Loading from "../../components/Loading";
import {
  BlogContent,
  CommentContainer,
  Image,
  ImageContainer,
  TopContent,
  Wrapper,
} from "./styles";
import Footer from "../../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { Comments, InputComment, Pagination } from "../../components";
import {
  createComment,
  getAllComments,
} from "../../redux/actions/commentActions";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { comments, loading: commentsLoading } = useSelector(
    (state) => state.comments
  );
  const user = useSelector((state) => state.user?.userInfo);
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState([]);

  const handleComment = (body) => {
    if (!user?.user || !user?.access_token) return;

    const data = {
      content: body,
      user: user?.user,
      blog_id: blog._id,
      blog_user_id: blog.user._id,
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data, user.access_token));
  };

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

  useEffect(() => {
    setShowComments(comments?.comments);
  }, [comments?.comments]);

  console.log(blog, "blog");

  // const fetchComments = useCallback(async(id: string) => {
  //   setLoading(true)
  //   await dispatch(getComments(id))
  //   setLoading(false)
  // },[dispatch])

  console.log(comments, "comments");

  useEffect(() => {
    dispatch(getAllComments(id));
  }, [dispatch, id]);
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

      <CommentContainer>
        <h3>✩ Comments ✩</h3>
        {user?.user ? (
          <InputComment callback={handleComment} />
        ) : (
          <p>
            Please <Link to={`/login?blog/${blog?._id}`}>login</Link> to submit
            comment.
          </p>
        )}
        {commentsLoading ? (
          <Loading />
        ) : (
          showComments?.map((comment, index) => (
            <Comments key={index} comment={comment} />
          ))
        )}
        {/* {comments.total > 1 && (
          <Pagination total={comments.total} callback={handlePagination} />
        )} */}
      </CommentContainer>
      <Footer />
    </>
  );
};

export default Blog;
