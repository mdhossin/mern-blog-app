import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { postAPI } from "../../api/api";

import { Button, Content, Error, Success, Wrapper } from "./styles";

const ActivationEmail = () => {
  const { active_token } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { addToast } = useToasts();
  useEffect(() => {
    if (active_token) {
      const activationEmail = async () => {
        try {
          const res = await postAPI(`active`, {
            active_token,
          });
          setSuccess(res.data.message);
          setError("");
        } catch (error) {
          setSuccess("");
          error.response &&
            setError(
              error.response.data.message
                ? error.response.data.message
                : error.message
            );
        }
      };
      activationEmail();
    }
  }, [active_token, error.response, error.message]);

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [success, error, addToast]);
  return (
    <Wrapper>
      <Content>
        <Error>{error && error}</Error>
        <Success>{success && success}</Success>

        <div>
          <Link to="/login">
            <Button>Back to Login Page</Button>
          </Link>
        </div>
      </Content>
    </Wrapper>
  );
};

export default ActivationEmail;
