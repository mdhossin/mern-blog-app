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

import Img from "../../assets/images/node.webp";
const CardBlog = () => {
  return (
    <Card>
      <Link to="blogs/sddf">
        <CardImg src={Img} />
      </Link>
      <ContentWrapper>
        <TopContent>
          <WritenBy>By: Jhon doe</WritenBy>
          <Publised> 11/22/22, 12:12:18 PM</Publised>
        </TopContent>
        <Heading>What is redux?</Heading>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          repellat?
        </Description>

        <Button to="/">Read More</Button>
      </ContentWrapper>
    </Card>
  );
};

export default CardBlog;
