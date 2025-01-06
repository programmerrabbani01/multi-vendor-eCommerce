import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser.tsx";
import React, { useEffect, useState } from "react";
import { getNavs } from "../navigations/index.ts";
import { IconType } from "react-icons/lib";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logOutUser } from "../features/auth/authApiSlice.ts";
import { AppDispatch } from "../app/store.ts";
import { HeaderProps } from "../types.ts";
// import { createToaster } from "../utils/tostify.ts";
// import { getAuthData, setMessageEmpty } from "../features/auth/authSlice.ts";

// Define the navigation item type
interface NavItem {
  id: number;
  title: string;
  path: string;
  icon: IconType;
  role: string;
}

export default function Sidebar({ showSidebar, setShowSidebar }: HeaderProps) {
  const location = useLocation();
  const { user } = useAuthUser();
  const dispatch = useDispatch<AppDispatch>();
  const [allNav, setAllNav] = useState<NavItem[]>([]);

  // log out user

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(logOutUser());
  };

  // get all menus
  useEffect(() => {
    const navs = getNavs(user?.role?.name || "");
    setAllNav(navs);
  }, [user]);

  return (
    <>
      <div className="">
        <div
          onClick={() => setShowSidebar(false)}
          className={`fixed transition-all duration-200 w-screen h-screen bg-[#22292f80] top-0 left-0 z-10 cursor-pointer ${
            !showSidebar ? "invisible" : "visible"
          } `}
        ></div>
        <div
          className={` sidebar w-[260px] fixed bg-[#283046] z-50 top-0 h-screen shadow-[0_0_15x_0_rgba(34_41_47_/_5%)] transition-all duration-300 overflow-y-auto ${
            showSidebar ? "left-0" : "-left-[260px] lg:left-0"
          } `}
        >
          {/* logo */}
          <div className="h-[70px] flex justify-center items-center ">
            <Link to="/">
              <img
                src="http://localhost:4001/images/logo.png"
                alt="logo"
                className="object-cover w-[180px] h-[50px]"
              />
            </Link>
          </div>
          {/* nav bar */}
          <div className="px-4">
            {user?.role?.name === "Admin" && (
              <ul>
                {allNav.map((nav, i) => {
                  const Icon = nav.icon;
                  return (
                    <li key={i}>
                      <Link
                        to={nav.path}
                        className={`${
                          location.pathname === nav.path
                            ? "bg-slate-600 shadow-indigo-500/50 duration-500 text-white  "
                            : "text-[#d0d2d6] duration-200"
                        }  px-3 py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 mb-1 transition-all duration-300 w-full font-primarySemiBold`}
                      >
                        <Icon size={20} />
                        {nav.title}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className=" px-3 py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 mb-1 transition-all duration-300 w-full text-[#d0d2d6] font-primarySemiBold"
                  >
                    <BiLogInCircle />
                    Logout
                  </button>
                </li>
              </ul>
            )}
            {user?.role?.name === "Seller" && (
              <ul>
                {allNav.map((nav, i) => {
                  const Icon = nav.icon;
                  return (
                    <li key={i}>
                      <Link
                        to={nav.path}
                        className={`${
                          location.pathname === nav.path
                            ? "bg-slate-600 shadow-indigo-500/50 duration-500 text-white  "
                            : "text-[#d0d2d6] duration-200"
                        }  px-3 py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 mb-1 transition-all duration-300 w-full font-primarySemiBold`}
                      >
                        <Icon size={20} />
                        {nav.title}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className=" px-3 py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 mb-1 transition-all duration-300 w-full text-[#d0d2d6] font-primarySemiBold"
                  >
                    <BiLogInCircle />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
