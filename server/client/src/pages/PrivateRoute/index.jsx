import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state?.user);

  const { userInfo, loading } = user;
  let location = useLocation();
  if (loading) {
    return <h2>Loading....</h2>;
  }

  if (!userInfo?.access_token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
