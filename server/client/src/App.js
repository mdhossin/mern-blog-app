import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Header } from "./components";
import {
  ActivationEmail,
  Blogs,
  Category,
  CreateBlog,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  OtherUserInfo,
  PrivateRoute,
  Profile,
  Register,
  ResetPassword,
  UpdateBlog,
} from "./pages";
import { ToastProvider } from "react-toast-notifications";
import { GlobalStyle } from "./styles/styles";

import { darkTheme, lightTheme } from "./utils/Theme";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/userActions";
import { getAllCategories } from "./redux/actions/categoryActions";
import { getAllBlogs } from "./redux/actions/blogActions";

const App = () => {
  const theme = useSelector((state) => state.theme);
  const { loading } = useSelector((state) => state.refreshToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getAllCategories());
    dispatch(getAllBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.user?.userInfo);

  if (loading) {
    return <h2>Loading...</h2>;
  }

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
          <Route
            path="create-blog"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="update-blog/:id"
            element={
              <PrivateRoute>
                <UpdateBlog />
              </PrivateRoute>
            }
          />

          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="category"
            element={
              <PrivateRoute>
                <Category />
              </PrivateRoute>
            }
          />
          <Route path="/profile/:id" element={<OtherUserInfo />} />

          <Route path="blogs/:category" element={<Blogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default App;
