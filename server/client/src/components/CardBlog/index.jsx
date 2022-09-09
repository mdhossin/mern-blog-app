import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  Description,
  Heading,
  Publised,
  WritenBy,
  ContentWrapper,
  TopContent,
  Button,
} from "./styles";

const CardBlog = ({ blog }) => {
  return (
    <Card>
      <Link to={`/blog/${blog._id}`}>
        <div className="card-img">
          <CardImg src={blog.thumbnail} />
        </div>
      </Link>
      <ContentWrapper>
        <TopContent>
          <WritenBy>
            <Link to={`/profile/${blog.user._id}`}>By: {blog.user.name}</Link>
          </WritenBy>
          <Publised>{new Date(blog.createdAt).toLocaleString()}</Publised>
        </TopContent>
        <Link to={`/blog/${blog._id}`}>
          <Heading>{blog.title}</Heading>
        </Link>
        <Description>{blog.description.slice(0, 50) + "..."}</Description>

        <Button to={`/blog/${blog._id}`}>Read More</Button>
      </ContentWrapper>
    </Card>
  );
};

export default CardBlog;
