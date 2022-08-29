import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
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
import { register } from "../../redux/actions/userActions";
import { USER_REGISTER_RESET } from "../../redux/constants/userConstants";
import { validRegister } from "../../utils/validRegister";

const Register = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    cf_password: "",
  });
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const userReg = useSelector((state) => state.userRegister);
  const { loading, error, userInfo: userRegInfo } = userReg;

  const { name, email, password, cf_password } = newUser;

  const handleChangeInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validRegister(newUser);

    if (result?.errLength) {
      return addToast(result?.errMsg[0], {
        appearance: "error",
        autoDismiss: true,
      });
    }

    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: USER_REGISTER_RESET });
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (userRegInfo) {
      dispatch({ type: USER_REGISTER_RESET });
      addToast(userRegInfo?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [userRegInfo, error, addToast, dispatch]);

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
      <FormWrapper onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            name="name"
            value={name}
            id="name"
            onChange={handleChangeInput}
            placeholder="Your Name"
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="email"
            name="email"
            value={email}
            id="email"
            onChange={handleChangeInput}
            placeholder="Your Email*"
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
        <InputGroup>
          <Input
            id="cf_password"
            name="cf_password"
            type={typeCfPass ? "text" : "password"}
            placeholder="Your Password*"
            value={cf_password || ""}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </small>
        </InputGroup>

        <InputGroup>
          <Button>{loading ? "Loading..." : "Sign Up"}</Button>
        </InputGroup>
      </FormWrapper>
    </Container>
  );
};

export default Register;
