import jwt_decode from "jwt-decode";

import axios from "axios";
import { BASE_URL } from "../api/api";
import { USER_LOGIN_SUCCESS } from "../redux/constants/userConstants";

export const checkTokenExp = async (token, dispatch) => {
  const decoded = jwt_decode(token);

  if (decoded.exp >= Date.now() / 1000) return;

  const res = await axios.get(`${BASE_URL}/api/refresh_token`);

  dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
  return res.data.access_token;
};
