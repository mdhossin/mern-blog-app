import { combineReducers } from "redux";
import { themeReducer } from "./themeReducer";
import { userLoginReducer, userRegisterReducer } from "./userReducer";

export default combineReducers({
  theme: themeReducer,
  user: userLoginReducer,
  userRegister: userRegisterReducer,
});
