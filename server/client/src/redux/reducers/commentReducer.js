import {
  ALL_COMMENT_FAIL,
  ALL_COMMENT_LOADING,
  ALL_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_RESET,
  CREATE_COMMENT_SUCCESS,
} from "../constants/commentConstants";

export const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        createComment: action.payload,
      };

    case CREATE_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_COMMENT_RESET:
      return {};

    default:
      return state;
  }
};

export const allCommentsReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_COMMENT_LOADING:
      return {
        loading: true,
        ...state,
      };
    case ALL_COMMENT_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
      };
    case ALL_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
