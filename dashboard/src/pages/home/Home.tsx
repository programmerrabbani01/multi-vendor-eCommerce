import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser.tsx";

export default function Home() {
  const { user } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role?.name === "Admin") {
      navigate("/admin/dashboard");
    } else if (user?.role?.name === "Seller") {
      navigate("/seller/dashboard");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
