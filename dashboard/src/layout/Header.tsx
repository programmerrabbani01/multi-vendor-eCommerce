import { FaList } from "react-icons/fa";
import { HeaderProps } from "../types.ts";
import adminPhoto from "../../public/images/admin.png";
import sellerPhoto from "../../public/images/seller.png";
import useAuthUser from "../hooks/useAuthUser.tsx";
import { CiChat1 } from "react-icons/ci";

export default function Header({ showSidebar, setShowSidebar }: HeaderProps) {
  const { user } = useAuthUser();

  // Determine the user photo
  const userPhoto =
    user?.photo || (user?.role?.name === "Admin" ? adminPhoto : sellerPhoto);
  return (
    <>
      <div className="fixed top-0 left-0 w-full px-2 py-5 lg:px-7 ">
        <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#283046] text-[#d0d2d6] px-5 transition-all duration-300">
          {/* side bar open & close */}
          <div
            className="w-[35px] flex justify-center items-center lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 "
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <span>
              <FaList />
            </span>
          </div>

          {/* search icon */}

          <div className="hidden md:block">
            <input
              type="text"
              name="search"
              placeholder="search"
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
            />
          </div>

          {/* user details */}

          <div className="flex items-center justify-center gap-8 ">
            {/* chat icon */}
            <div className="icon">
              <CiChat1 className="w-[23px] h-[23px] " />
            </div>
            {/* details */}
            <div className="flex items-center justify-between gap-4">
              <div className="info">
                <h2 className="text-base font-primaryBold">
                  {`${user?.firstName || "Unknown"} ${
                    user?.lastName || "User"
                  }`}
                </h2>
                <p className="text-sm text-end font-primaryMedium">
                  {user?.role?.name || "Unknown Role"}
                </p>
              </div>
              <div className="rounded-full photo ring-1 ring-indigo-500">
                <img
                  src={userPhoto}
                  alt={`${user?.role || "User"} Photo`}
                  className="w-[45px] h-[45px] rounded-full object-cover overflow-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
