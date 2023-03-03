import { HomeIcon,Bars3Icon,Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";

function Root() {
  return (
    <div className="px-4 py-4 min-h-screen border relative border-black">
      <Header/>
      <Outlet />
      <div className="flex justify-center rounded-lg left-4 gap-x-16 right-4 bottom-4 absolute py-2 px-4 border border-black">
        <NavLink to={"/organize/projects"}>
          <Bars3Icon width={24} height={24} />
        </NavLink>
        <NavLink to={"/home/timeblocks"}>
          <HomeIcon width={24} height={24} />
        </NavLink>
        <NavLink to={"/settings"}>
          <Cog6ToothIcon width={24} height={24} />
        </NavLink>
      </div>
    </div>
  );
}

export default Root;
