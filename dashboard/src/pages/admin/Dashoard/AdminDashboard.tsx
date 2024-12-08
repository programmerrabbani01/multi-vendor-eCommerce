import { useDispatch, useSelector } from "react-redux";
import {
  getAuthData,
  setMessageEmpty,
} from "../../../features/auth/authSlice.ts";
import { useEffect } from "react";
import { createToaster } from "../../../utils/tostify.ts";
import { AppDispatch } from "../../../app/store.ts";
import MetaData from "../../../components/MetaData.tsx";
import useAuthUser from "../../../hooks/useAuthUser.tsx";
import { CgDollar } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";

export default function AdminDashboard() {
  const title = "Admin Dashboard";

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
      {user?.role?.name === "Admin" && (
        <>
          <MetaData title={title} />

          {/* start */}
          <div className="px-2 py-5 md:px-7">
            {/* top cards */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">$ 1350</h2>
                  <h4 className="text-base font-primaryRegular">Total Sales</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#28c76f1f] rounded-full flex justify-center items-center animate-pulse">
                  <CgDollar size={23} className="text-[#28c76f] shadow-lg" />
                </div>
              </div>
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">16</h2>
                  <h4 className="text-base font-primaryRegular">Products</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#e000e81f] rounded-full flex justify-center items-center animate-pulse">
                  <RiProductHuntLine
                    size={23}
                    className="text-[#cd00e8] shadow-lg"
                  />
                </div>
              </div>
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">3</h2>
                  <h4 className="text-base font-primaryRegular">Sellers</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#00cfe81f] rounded-full flex justify-center items-center animate-pulse">
                  <FaUsers size={23} className="text-[#00cfe8] shadow-lg" />
                </div>
              </div>
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">6</h2>
                  <h4 className="text-base font-primaryRegular">Orders</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#7367f01f] rounded-full flex justify-center items-center animate-pulse">
                  <IoCartOutline
                    size={23}
                    className="text-[#7367f0] shadow-lg"
                  />
                </div>
              </div>
            </div>
            {/* chart & seller Message */}
            <div className="flex flex-wrap w-full mt-7">
              {/* chart */}
              <div className=""></div>
              {/* message */}
              <div className=""></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
