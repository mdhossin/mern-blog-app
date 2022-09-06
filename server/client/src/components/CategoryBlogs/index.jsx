import React from "react";
import { useSelector } from "react-redux";
import CardBlog from "../CardBlog";
import Loading from "../Loading";
import { Container, Content, Heading, Wrapper } from "./styles";

const CategoryBlogs = () => {
  const blogsData = useSelector((state) => state.homeBlogs);
  const { loading, blogs, error } = blogsData;
  console.log(blogs);

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <Wrapper>
        {blogs?.map((homeblog, index) => (
          <>
            {homeblog.count > 0 && (
              <div className="category" key={homeblog._id.toString() + index}>
                <Heading>
                  {homeblog?.name} <span>({homeblog.count})</span>
                </Heading>
                <Content>
                  {homeblog.blogs.map((blog) => (
                    <CardBlog blog={blog} />
                  ))}
                </Content>
              </div>
            )}
          </>
        ))}
      </Wrapper>
    </Container>
  );
};

export default CategoryBlogs;
