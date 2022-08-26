import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Header } from "./components";
import { CreateBlog, Home, Login, NotFound, Register } from "./pages";

import { GlobalStyle } from "./styles/styles";

import { darkTheme, lightTheme } from "./utils/Theme";

const App = () => {
  const theme = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme.darkMode === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
