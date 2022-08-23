import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { darkModeAction } from "./redux/actions/themeActions";

import { darkTheme, lightTheme } from "./utils/Theme";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color_primary};
  color: ${(props) => props.theme.color_primary};
`;
const App = () => {
  const theme = useSelector((state) => state.theme);
  console.log(theme);
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
    <ThemeProvider theme={theme.darkMode === "light" ? lightTheme : darkTheme}>
      <Container className="App">
        hello world
        <button onClick={() => themeChange("dark")}>Dark Mode</button>
        <button onClick={() => themeChange("light")}>Light Mode</button>
      </Container>
    </ThemeProvider>
  );
};

export default App;
