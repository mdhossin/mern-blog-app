import React from "react";
import {
  Container,
  TopContent,
  H2,
  InputWrapper,
  Wrapper,
  Input,
  InputGroup,
  ForgotText,
  SmsText,
  Button,
} from "./styles";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopContent>
          <H2>Login</H2>
          <span>
            Already have an account? <Link to="/sign-up">Sign Up</Link>
          </span>
        </TopContent>
      </Wrapper>
      <InputWrapper>
        <InputGroup>
          <Input type="email" placeholder="Your Email / Phone Number" />
        </InputGroup>
        <InputGroup>
          <Input type="password" placeholder="Your Password*" />
        </InputGroup>

        <ForgotText>
          <Link to="/">Forgot your password?</Link>
          <SmsText>Sign in with Sms?</SmsText>
        </ForgotText>

        <InputGroup>
          <Button>Login</Button>
        </InputGroup>
      </InputWrapper>
    </Container>
  );
};

export default Login;
