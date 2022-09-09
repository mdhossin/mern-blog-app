import { combineReducers } from "redux";
import {
  allBlogsReducer,
  blogsByUserReducer,
  blogsCategoryReducer,
  createBlogReducer,
  updateBlogReducer,
} from "./blogReducer";
import { categoryReducer, createCategoryReducer } from "./categoryReducer";

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
  // other info user
  otherInfo: otherInfoUserReducer,
  blogsByUser: blogsByUserReducer,
});
