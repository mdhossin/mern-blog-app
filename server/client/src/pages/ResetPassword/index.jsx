import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";

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
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../redux/actions/userActions";
import { FORGOT_PASSWORD_RESET } from "../../redux/constants/userConstants";
const ResetPassword = () => {
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const resetData = useSelector((state) => state.reset);
  const { error, loading, resetPassword } = resetData;

  const resetPasswordHandler = () => {
    dispatch(resetPasswordAction(password, confirmPassword, token));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: FORGOT_PASSWORD_RESET });
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (resetPassword?.message) {
      dispatch({ type: FORGOT_PASSWORD_RESET });
      addToast(resetPassword?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [resetPassword, error, addToast, dispatch]);

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
            type={typePass ? "text" : "password"}
            placeholder="New Password*"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </small>
        </InputGroup>
        <InputGroup>
          <Input
            id="cf_password"
            type={typeCfPass ? "text" : "password"}
            placeholder="Confirm Password*"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={resetPasswordHandler}
          >
            {loading ? "Loading...." : "Reset Password"}
          </Button>
        </InputGroup>
      </FormWrapper>
    </Container>
  );
};

export default ResetPassword;
