import axios from "axios";
import { BASE_URL, postAPI } from "../../api/api";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

// user login action
export const login = (account, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await postAPI("login", { account, password });

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

export const register = (name, account, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await postAPI("register", {
      name,
      account,
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
