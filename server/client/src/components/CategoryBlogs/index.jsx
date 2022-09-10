import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardBlog from "../CardBlog";
import Loading from "../Loading";
import { Container, Content, Heading, ReadMore, Wrapper } from "./styles";

const CategoryBlogs = () => {
  const blogsData = useSelector((state) => state.homeBlogs);
  const { loading, blogs, error } = blogsData;

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <Wrapper>
        {error ? (
          <h2>{error}</h2>
        ) : (
          blogs?.length > 0 &&
          blogs?.map((homeblog, index) => (
            <>
              {homeblog.count > 0 && (
                <div className="category" key={homeblog._id.toString() + index}>
                  <Link to={`/blogs/${homeblog.name}`}>
                    <Heading>
                      {homeblog?.name} <span>({homeblog.count})</span>
                    </Heading>
                  </Link>
                  <Content>
                    {homeblog.blogs.map((blog) => (
                      <CardBlog blog={blog} />
                    ))}
                  </Content>
                </div>
              )}

              <ReadMore>
                {homeblog?.count > 4 && (
                  <Link to={`/blogs/${homeblog.name}`}>Read more &gt;&gt;</Link>
                )}
              </ReadMore>
            </>
          ))
        )}
      </Wrapper>
    </Container>
  );
};

export default CategoryBlogs;
