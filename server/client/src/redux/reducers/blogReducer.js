import {
  ALL_BLOG_FAIL,
  ALL_BLOG_LOADING,
  ALL_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_RESET,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_RESET,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS_BY_USER_FAIL,
  GET_BLOGS_BY_USER_LOADING,
  GET_BLOGS_BY_USER_SUCCESS,
  GET_BLOGS_CATEGORY_ID_FAIL,
  GET_BLOGS_CATEGORY_ID_LOADING,
  GET_BLOGS_CATEGORY_ID_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_RESET,
  UPDATE_BLOG_SUCCESS,
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

// get all product
export const allBlogsReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_BLOG_LOADING:
      return {
        loading: true,
        ...state,
      };
    case ALL_BLOG_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };
    case ALL_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const blogsCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS_CATEGORY_ID_LOADING:
      return {
        loading: true,
        ...state,
      };
    case GET_BLOGS_CATEGORY_ID_SUCCESS:
      return {
        loading: false,
        blogsByCategory: action.payload,

        //     if (state?.every((item) => item.id !== action.payload.id)) {
        //   return [...state, action.payload];
        // } else {
        //   return state.map((blog) =>
        //     blog.id === action.payload.id ? action.payload : blog
        //   );
        // }
      };

    case GET_BLOGS_CATEGORY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const blogsByUserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS_BY_USER_LOADING:
      return {
        loading: true,
        ...state,
      };
    case GET_BLOGS_BY_USER_SUCCESS:
      return {
        loading: false,
        blogsByUser: action.payload,

        //     if (state?.every((item) => item.id !== action.payload.id)) {
        //   return [...state, action.payload];
        // } else {
        //   return state.map((blog) =>
        //     blog.id === action.payload.id ? action.payload : blog
        //   );
        // }
      };

    case GET_BLOGS_BY_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BLOG_SUCCESS:
      return {
        loading: false,
        updateBlog: action.payload,
      };

    case UPDATE_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_BLOG_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BLOG_SUCCESS:
      return {
        loading: false,
        deleteBlog: action.payload,
      };

    case DELETE_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_BLOG_RESET:
      return {};

    default:
      return state;
  }
};
