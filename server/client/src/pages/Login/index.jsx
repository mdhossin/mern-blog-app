import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookLogin } from "react-facebook-login-lite";
import {
  TopContent,
  H2,
  Wrapper,
  Input,
  InputGroup,
  ForgotText,
  Button,
  Container,
  FormWrapper,
} from "./styles";
import { USER_LOGIN_RESET } from "../../redux/constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  facebookLogin,
  googleLogin,
  login,
} from "../../redux/actions/userActions";
import { GoogleLogin } from "@react-oauth/google";
const Login = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [typePass, setTypePass] = useState(false);

  // const redirect = location.state?.path || "/";

  // console.log(location.state, "state", redirect);

  const userdata = useSelector((state) => state.user);

  const { loading, error, userInfo } = userdata;

  console.log(userdata, "userdata");

  const { email, password } = user;
  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const responseGoogle = async (response) => {
    try {
      dispatch(googleLogin(response.credential));
    } catch (error) {
      alert(error?.message);
    }
  };

  console.log(location, "location");

  useEffect(() => {
    if (userInfo?.access_token) {
      console.log(location.search);
      let url = location.search.replace("?", "/") || "/";

      return navigate(url);
    }
  }, [userInfo?.access_token, navigate, location.search]);
  useEffect(() => {
    if (error) {
      dispatch({ type: USER_LOGIN_RESET });
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (userInfo) {
      if (userInfo?.message !== undefined) {
        addToast(userInfo?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    }
  }, [userInfo, error, addToast, navigate, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const responseFacebook = (response) => {
    const { accessToken, userID } = response.authResponse;

    dispatch(facebookLogin(accessToken, userID));
  };

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
      <FormWrapper onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email*"
            value={email || ""}
            onChange={handleChangeInput}
          />
        </InputGroup>
        <InputGroup>
          <Input
            id="password"
            name="password"
            type={typePass ? "text" : "password"}
            placeholder="Your Password*"
            value={password || ""}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </small>
        </InputGroup>

        <ForgotText>
          <Link to="/forgot-password">Forgot your password?</Link>
        </ForgotText>

        <InputGroup>
          <Button disabled={email && password ? false : true} type="submit">
            {loading ? "Loading...." : "Login"}
          </Button>
        </InputGroup>

        <div className="google-button">
          <GoogleLogin
            width="100%"
            onSuccess={responseGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <div className="facebook_login">
          <FacebookLogin appId="702774910777934" onSuccess={responseFacebook} />
        </div>
      </FormWrapper>

      {/* <FacebookLogin
        appId="1312072336268927"
        fields="name,email,picture.type(large)"
        callback={responseFacebook}
        redirectUri={window.location.href}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick}>
            This is my custom FB button
          </Button>
        )}
      /> */}
    </Container>
  );
};

export default Login;
