import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "../features/auth/authSlice";
import { User } from "../types";

interface AuthContext {
  user: User | null;
}

const useAuthUser = (): AuthContext => {
  const { user } = useSelector(getAuthData); // `user` can be null
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/admin/login"); // Redirect to login if user is undefined
    }
  }, [user, navigate]);

  // Return the user even if it's null, so the component can handle it appropriately
  return { user };
};

export default useAuthUser;
