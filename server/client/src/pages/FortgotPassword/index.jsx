import axios from "axios";
import React, { useEffect, useState } from "react";

import { useToasts } from "react-toast-notifications";
import { BASE_URL } from "../../api/api";
import { isEmail } from "../../utils/validRegister";

import { Button, Section, Wrapper } from "./styles";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
    error: "",
    success: "",
  });

  const { addToast } = useToasts();
  const { email, error, success } = data;
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, error: "Invalid emails.", success: "" });

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/user/forgot_password`, {
        email,
      });
      setLoading(false);
      setData({ ...data, error: "", success: res.data.message });
    } catch (error) {
      setLoading(false);
      error.response.data.message &&
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
        email: "",
        error: "",
        success: "",
      });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      setData({
        email: "",
        error: "",
        success: "",
      });
    }
  }, [error, success, addToast]);
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
            onChange={handleChangeInput}
            placeholder="Your email"
          />

          <Button type="button" onClick={forgotPassword}>
            {loading ? "Loading..." : "Verify your email"}
          </Button>
        </form>
      </Wrapper>
    </Section>
  );
};

export default ForgotPassword;
