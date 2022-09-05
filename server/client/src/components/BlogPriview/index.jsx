import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BlogContent, Wrapper } from "./styles";

const BlogPriview = ({ blog }) => {
  const { user, access_token } = useSelector((state) => state.user?.userInfo);
  const { id } = useParams();
  console.log(user);
  return (
    <Wrapper>
      <div className="img-container">
        {blog?.thumbnail && (
          <>
            {typeof blog.thumbnail === "string" ? (
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={blog.thumbnail}
                  className="blog-img"
                  alt="thumbnail"
                />
              </Link>
            ) : (
              <img src={blog.thumbnail} className="blog-img" alt="thumbnail" />
            )}
          </>
        )}
      </div>

      <BlogContent>
        <h5 className="title">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h5>
        <p className="desc">{blog.description}</p>

        {blog.title && (
          <div className="edit-blog">
            {id === user?._id && (
              <div style={{ cursor: "pointer" }}>
                <Link to={`/update_blog/${blog._id}`}>
                  <i className="fas fa-edit" title="edit" />
                </Link>

                <i
                  className="fas fa-trash text-danger mx-3"
                  title="edit"
                  //   onClick={handleDelete}
                />
              </div>
            )}
            <small className="date">
              {new Date(blog.createdAt).toLocaleString()}
            </small>
          </div>
        )}
      </BlogContent>
    </Wrapper>
  );
};

export default BlogPriview;
