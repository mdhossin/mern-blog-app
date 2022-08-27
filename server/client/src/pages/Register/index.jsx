import React, { useEffect } from "react";
import {
  Container,
  TopContent,
  H2,
  FormWrapper,
  Wrapper,
  Input,
  InputGroup,
  Button,
} from "../Login/styles";
import { Link } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      <FormWrapper>
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
      </FormWrapper>
    </Container>
  );
};

export default Register;
