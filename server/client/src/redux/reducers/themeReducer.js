import { DARK_MODE } from "../constants/themeConstants";

export const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case DARK_MODE:
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};
