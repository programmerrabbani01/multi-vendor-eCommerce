import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import { useState } from "react";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="bg-[#161d31] w-full min-h-screen">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </>
  );
}
