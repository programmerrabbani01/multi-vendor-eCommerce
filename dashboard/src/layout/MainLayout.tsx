import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";

export default function MainLayout() {
  return (
    <>
      <div className="bg-[#161d31] w-full min-h-screen">
        <Header />
        <Sidebar />
        <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </>
  );
}
