import {
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_RESET,
  CREATE_BLOG_SUCCESS,
} from "../constants/blogConstants";

export const createBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BLOG_SUCCESS:
      return {
        loading: false,
        createBlog: action.payload,
      };

    case CREATE_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_BLOG_RESET:
      return {};

    default:
      return state;
  }
};
