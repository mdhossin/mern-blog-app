import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";
import { userLoginReducer } from "./userReducer";

export default combineReducers({
  theme: themeReducer,
  user: userLoginReducer,
});
