import { useDispatch, useSelector } from "react-redux";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice.ts";
import { useEffect } from "react";
import { createToaster } from "../../utils/tostify.ts";
import { AppDispatch } from "../../app/store.ts";
import MetaData from "../../components/MetaData.tsx";
import useAuthUser from "../../hooks/useAuthUser.tsx";
export default function SellerDashboard() {
  const title = "Seller Dashboard";
  const { user } = useAuthUser();
  const { message } = useSelector(getAuthData);

  const dispatch = useDispatch<AppDispatch>();

  // for success or errror message
  useEffect(() => {
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [dispatch, message]);
  return (
    <>
      {user?.role?.name === "Seller" && (
        <>
          <MetaData title={title} />
          <div className="text-white">Seller Dashboard</div>
        </>
      )}
    </>
  );
}
