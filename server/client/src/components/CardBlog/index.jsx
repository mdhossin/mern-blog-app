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
  console.log(blog);
  return (
    <Card>
      <Link to="blogs/sddf">
        <div className="card-img">
          <CardImg src={blog.thumbnail} />
        </div>
      </Link>
      <ContentWrapper>
        <TopContent>
          <WritenBy>By: {blog.user.name}</WritenBy>
          <Publised>{new Date(blog.createdAt).toLocaleString()}</Publised>
        </TopContent>
        <Link to="blogs/sddf">
          <Heading>{blog.title}</Heading>
        </Link>
        <Description>{blog.description.slice(0, 50) + "..."}</Description>

        <Button to="/">Read More</Button>
      </ContentWrapper>
    </Card>
  );
};

export default CardBlog;
