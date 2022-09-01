import { combineReducers } from "redux";

import { themeReducer } from "./themeReducer";
import {
  fortgotPaswordReducer,
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
});
