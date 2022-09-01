import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useToasts } from "react-toast-notifications";
import { forgotPassword } from "../../redux/actions/userActions";
import { FORGOT_PASSWORD_RESET } from "../../redux/constants/userConstants";

import { Button, Section, Wrapper } from "./styles";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const forgotData = useSelector((state) => state.forgot);
  const { error, loading, forgotPassword: forgotSuccess } = forgotData;

  const forgotPasswordHandler = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: FORGOT_PASSWORD_RESET });
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (forgotSuccess?.message) {
      dispatch({ type: FORGOT_PASSWORD_RESET });
      addToast(forgotSuccess?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [forgotSuccess, error, addToast, dispatch]);
  return (
    <Section>
      <Wrapper>
        <h3>Forgot your password?</h3>
        <p>We will send you an email to reset your password.</p>
        <form>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />

          <Button type="button" onClick={forgotPasswordHandler}>
            {loading ? "Loading..." : "Verify your email"}
          </Button>
        </form>
      </Wrapper>
    </Section>
  );
};

export default ForgotPassword;
