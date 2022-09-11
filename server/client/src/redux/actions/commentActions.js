import axios from "axios";
import { BASE_URL } from "../../api/api";
import { CREATE_BLOG_FAIL } from "../constants/blogConstants";
import {
  ALL_COMMENT_FAIL,
  ALL_COMMENT_LOADING,
  ALL_COMMENT_SUCCESS,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "../constants/commentConstants";

export const createComment = (comment, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/comment`,
      comment,
      config
    );

    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
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

export const getAllComments = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COMMENT_LOADING });

    const { data } = await axios.get(`${BASE_URL}/api/comments/blog/${id}`);

    dispatch({
      type: ALL_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_COMMENT_FAIL,
      payload:
        error?.response && error.response.data?.message
          ? error.response.data?.message
          : error?.message,
    });
  }
};
