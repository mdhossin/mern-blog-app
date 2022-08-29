import React from "react";
import {
  Wrapper,
  ProfileContent,
  BlogContent,
  InputGroup,
  Input,
  ImageBox,
  Lablel,
  Button,
} from "./styles";

const Profile = () => {
  return (
    <Wrapper>
      <ProfileContent>
        <ImageBox></ImageBox>
        <InputGroup>
          <Lablel>Name</Lablel>
          <Input name="name" id="name" placeholder="Your Name" type="text" />
        </InputGroup>
        <InputGroup>
          <Lablel>Email</Lablel>
          <Input name="email" id="name" placeholder="Your Email" type="text" />
        </InputGroup>
        <p>* Quick login account with google can't use this function *</p>
        <InputGroup>
          <Lablel>Password</Lablel>
          <Input
            name="password"
            id="name"
            placeholder="Your Password"
            type="password"
          />
        </InputGroup>
        <InputGroup>
          <Lablel>Confirm Password</Lablel>
          <Input
            name="cf_password"
            id="name"
            placeholder="Confirm Password"
            type="password"
          />
        </InputGroup>

        <Button>Update</Button>
      </ProfileContent>
      <BlogContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
        minima pariatur molestias repellat delectus ducimus natus atque
        deleniti? Quia, quibusdam laboriosam optio exercitationem hic iusto
        deserunt voluptatum animi inventore praesentium.
      </BlogContent>
    </Wrapper>
  );
};

export default Profile;
