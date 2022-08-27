import { postAPI } from "../../api/api";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
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
