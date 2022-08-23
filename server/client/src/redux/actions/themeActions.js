import { DARK_MODE } from "../constants/themeConstants";

export const darkModeAction = (theme) => {
  return {
    type: DARK_MODE,
    payload: theme,
  };
};
