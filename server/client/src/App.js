import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Header } from "./components";
import {
  ActivationEmail,
  CreateBlog,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Register,
  ResetPassword,
} from "./pages";
import { ToastProvider } from "react-toast-notifications";
import { GlobalStyle } from "./styles/styles";

import { darkTheme, lightTheme } from "./utils/Theme";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/userActions";

const App = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const user = useSelector((state) => state.user?.userInfo);

  return (
    <ToastProvider placement="top-right">
      <ThemeProvider
        theme={theme.darkMode === "light" ? lightTheme : darkTheme}
      >
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="login"
            element={user?.access_token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="sign-up"
            element={user?.access_token ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="active/:active_token"
            element={
              user?.access_token ? <Navigate to="/" /> : <ActivationEmail />
            }
          />

          <Route
            path="forgot-password"
            element={
              user?.access_token ? <Navigate to="/" /> : <ForgotPassword />
            }
          />

          <Route path="user/reset/:token" element={<ResetPassword />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default App;
