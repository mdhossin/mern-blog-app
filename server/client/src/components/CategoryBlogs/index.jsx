import React from "react";
import CardBlog from "../CardBlog";
import { Container, Content, Heading, Wrapper } from "./styles";

const CategoryBlogs = () => {
  return (
    <Container>
      <Wrapper>
        <Heading>
          Redux <span>(2)</span>
        </Heading>

        <Content>
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default CategoryBlogs;
