import React, { useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { darkModeAction } from "../../redux/actions/themeActions";
import { ThemeSwitcherStyles } from "./styles";

export default function ThemeSwitcher() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!theme.darkMode) {
      dispatch(darkModeAction(window.localStorage.getItem("theme")));
    }
  }, [theme.darkMode, dispatch]);

  const themeChange = (value) => {
    window.localStorage.setItem("theme", value);
    dispatch(darkModeAction(value));
  };

  return (
    <ThemeSwitcherStyles>
      <input
        type="checkbox"
        id="switcher"
        checked={theme.darkMode === "light"}
      />
      <label htmlFor="switcher">
        <div onClick={() => themeChange("dark")} className="icon">
          <FiSun />
        </div>
        <div onClick={() => themeChange("light")} className="icon">
          <FiMoon />
        </div>
      </label>
    </ThemeSwitcherStyles>
  );
}
