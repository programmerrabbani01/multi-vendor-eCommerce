import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser.tsx";
import { ClockLoader } from "react-spinners";

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
    <>
      <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
        <ClockLoader size={100} color="#2EA3DC" />
      </div>
    </>
  );
}
