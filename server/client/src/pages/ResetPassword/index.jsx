import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";

import axios from "axios";
import { BASE_URL } from "../../api/api";
import { checkPassword, isLength } from "../../utils/validRegister";
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
const ResetPassword = () => {
  const [data, setData] = useState({
    password: "",
    cf_password: "",
    error: "",
    success: "",
  });
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const { addToast } = useToasts();

  const { password, cf_password, error, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        error: "Password must be at least 6 characters.",
        success: "",
      });

    if (checkPassword(password, cf_password))
      return setData({
        ...data,
        error: "Password did not match.",
        success: "",
      });

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/user/reset`,
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);

      setData({ ...data, error: "", success: res.data.message });
    } catch (error) {
      setLoading(false);
      error.response &&
        setData({
          ...data,
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          success: "",
        });
    }
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      setData({
        password: "",
        cf_password: "",
        error: "",
        success: "",
      });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      setData({
        password: "",
        cf_password: "",
        error: "",
        success: "",
      });
    }
  }, [error, success, addToast]);

  return (
    <Container>
      <Wrapper>
        <TopContent>
          <H2>Reset Password</H2>
        </TopContent>
      </Wrapper>
      <FormWrapper>
        <InputGroup>
          <Input
            id="password"
            name="password"
            type={typePass ? "text" : "password"}
            placeholder="New Password*"
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
            placeholder="Confirm Password*"
            value={cf_password || ""}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </small>
        </InputGroup>
        <ForgotText>
          <Link to="/login">Back to login?</Link>
        </ForgotText>

        <InputGroup>
          <Button
            disabled={password ? false : true}
            type="button"
            onClick={handleResetPass}
          >
            {loading ? "Loading...." : "Reset Password"}
          </Button>
        </InputGroup>
      </FormWrapper>
    </Container>
  );
};

export default ResetPassword;
