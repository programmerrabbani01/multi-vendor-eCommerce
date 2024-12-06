import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser.tsx";
import { useEffect, useState } from "react";
import { getNavs } from "../navigations/index.ts";
import { IconType } from "react-icons/lib";

// Define the navigation item type
interface NavItem {
  id: number;
  title: string;
  path: string;
  icon: IconType;
  role: string;
}

export default function Sidebar() {
  const [allNav, setAllNav] = useState<NavItem[]>([]);

  useEffect(() => {
    const navs = getNavs("Admin");
    setAllNav(navs);
  }, []);

  const location = useLocation();

  // const { user } = useAuthUser();
  const { user } = useAuthUser();

  return (
    <>
      <div className="">
        <div className=""></div>
        <div
          className={`w-[260px] fixed bg-[#283046] z-50 top-0 h-screen shadow-[0_0_15x_0_rgba(34_41_47_/_5%)] transition-all duration-300 `}
        >
          {/* logo */}
          <div className="h-[70px] flex justify-center items-center ">
            <Link to="/">
              <img
                src="http://localhost:3001/images/logo.png"
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
                        }  px-3 py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 mb-1 transition-all duration-300 w-full`}
                      >
                        <Icon size={20} />
                        {nav.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            {user?.role?.name === "Seller" && (
              <ul>
                <li>Seller Dashboard</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
