import axios from "axios";
import { BASE_URL } from "../../api/api";

import {
  ALL_BLOG_FAIL,
  ALL_BLOG_LOADING,
  ALL_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
} from "../constants/blogConstants";

export const createBlog = (blog, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOG_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.post(`${BASE_URL}/api/blog`, blog, config);

    dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data?.message
          : error?.message,
    });
  }
};

export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOG_LOADING });

    const { data } = await axios.get(`${BASE_URL}/api/home/blogs`);

    dispatch({
      type: ALL_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BLOG_FAIL,
      payload:
        error?.response && error.response.data?.message
          ? error.response.data?.message
          : error?.message,
    });
  }
};
