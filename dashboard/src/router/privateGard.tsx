import { useSelector } from "react-redux";
import { getAuthData } from "../features/auth/authSlice.ts";
import { Navigate, Outlet } from "react-router-dom";

const PrivateGard = () => {
  const { user } = useSelector(getAuthData);

  return user ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateGard;
