import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthData } from "../features/auth/authSlice.ts";

const PublicGard = () => {
  const { user } = useSelector(getAuthData);

  if (localStorage.getItem("user")) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  return <Outlet />;
};

export default PublicGard;
