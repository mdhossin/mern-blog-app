import React from "react";
import {
  Container,
  TopContent,
  H2,
  InputWrapper,
  Wrapper,
  Input,
  InputGroup,
  Button,
} from "../Login/styles";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <TopContent>
          <H2>Sign Up</H2>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </TopContent>
      </Wrapper>
      <InputWrapper>
        <InputGroup>
          <Input type="text" placeholder="Your Name*" />
        </InputGroup>
        <InputGroup>
          <Input type="email" placeholder="Your Email / Phone Number*" />
        </InputGroup>
        <InputGroup>
          <Input type="password" placeholder="Your Password*" />
        </InputGroup>
        <InputGroup>
          <Input type="password" placeholder="Confirm Password*" />
        </InputGroup>

        <InputGroup>
          <Button>Sign Up</Button>
        </InputGroup>
      </InputWrapper>
    </Container>
  );
};

export default Register;
