import { combineReducers } from "redux";
import {
  allBlogsReducer,
  blogsByUserReducer,
  blogsCategoryReducer,
  createBlogReducer,
  deleteBlogReducer,
  updateBlogReducer,
} from "./blogReducer";
import { categoryReducer, createCategoryReducer } from "./categoryReducer";
import { allCommentsReducer, createCommentReducer } from "./commentReducer";

import { themeReducer } from "./themeReducer";
import {
  fortgotPaswordReducer,
  otherInfoUserReducer,
  resetPaswordReducer,
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer,
} from "./userReducer";

export default combineReducers({
  theme: themeReducer,
  user: userLoginReducer,
  userRegister: userRegisterReducer,
  userLogout: userLogoutReducer,
  forgot: fortgotPaswordReducer,
  reset: resetPaswordReducer,
  createCategory: createCategoryReducer,
  allCategories: categoryReducer,
  refreshToken: userLoginReducer,
  // blog
  createBlog: createBlogReducer,
  updateBlog: updateBlogReducer,
  homeBlogs: allBlogsReducer,
  blogsByCategory: blogsCategoryReducer,
  deleteBlog: deleteBlogReducer,
  // other info user
  otherInfo: otherInfoUserReducer,
  blogsByUser: blogsByUserReducer,

  // COMMERNT
  createComment: createCommentReducer,
  comments: allCommentsReducer,
});
