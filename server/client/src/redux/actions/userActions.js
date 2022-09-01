import axios from "axios";
import { BASE_URL, postAPI } from "../../api/api";
import { checkTokenExp } from "../../utils/checkTokenExp";

import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

// user login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await postAPI("login", { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    // set the firtlogin true when the user first login
    localStorage.setItem("logged", "blogApp");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// user registration action

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await postAPI("register", {
      name,
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// refresh token action

export const refreshToken = () => async (dispatch) => {
  const logged = localStorage.getItem("logged");
  if (logged !== "blogApp") return;

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.get(`${BASE_URL}/api/refresh_token`);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    localStorage.removeItem("logged");
  }
};

// user logout action
export const logout = () => async (dispatch, getState) => {
  const token = getState().user?.userInfo?.access_token;
  const result = await checkTokenExp(token, dispatch);
  const access_token = result ? result : token;

  try {
    localStorage.removeItem("logged");
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/logout`, config);

    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

// user google login

export const googleLogin = (id_token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: id_token,
      },
    };

    const { data } = await axios.post(`${BASE_URL}/api/google_login`, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("logged", "blogApp");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await axios.post(`${BASE_URL}/api/user/forgot_password`, {
      email,
    });

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const resetPasswordAction =
  (password, confirmPassword, token) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/user/reset`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
