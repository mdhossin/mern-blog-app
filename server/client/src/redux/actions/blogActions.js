import axios from "axios";
import { BASE_URL } from "../../api/api";

import {
  ALL_BLOG_FAIL,
  ALL_BLOG_LOADING,
  ALL_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  GET_BLOGS_BY_USER_LOADING,
  GET_BLOGS_BY_USER_SUCCESS,
  GET_BLOGS_CATEGORY_ID_FAIL,
  GET_BLOGS_CATEGORY_ID_LOADING,
  GET_BLOGS_CATEGORY_ID_SUCCESS,
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

export const getBlogsByCategoryId = (id, search) => async (dispatch) => {
  try {
    let limit = 4;
    let value = search ? search : `?page=${1}`;

    dispatch({ type: GET_BLOGS_CATEGORY_ID_LOADING });

    const { data } = await axios.get(
      `${BASE_URL}/api/blogs/category/${id}${value}&limit=${limit}`
    );

    dispatch({
      type: GET_BLOGS_CATEGORY_ID_SUCCESS,
      payload: { ...data, id, search },
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_CATEGORY_ID_FAIL,
      payload:
        error?.response && error.response.data?.message
          ? error.response.data?.message
          : error?.message,
    });
  }
};
export const getBlogsByUserId = (id, search) => async (dispatch) => {
  try {
    let limit = 6;
    let value = search ? search : `?page=${1}`;

    dispatch({ type: GET_BLOGS_BY_USER_LOADING });

    const { data } = await axios.get(
      `${BASE_URL}/api/blogs/user/${id}${value}&limit=${limit}`
    );

    dispatch({
      type: GET_BLOGS_BY_USER_SUCCESS,
      payload: { ...data, id, search },
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_CATEGORY_ID_FAIL,
      payload:
        error?.response && error.response.data?.message
          ? error.response.data?.message
          : error?.message,
    });
  }
};
