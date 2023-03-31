import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";

function Organize() {
  return (
    <div className="mt-4 border-black">
        <div className="bg-genesis-gray-200 border-black rounded-xl px-1.5 py-1.5 grid grid-cols-2">
        <NavLink to={"/organize/projects"}>
          {({ isActive }) => {
            return (
              <span
              className={clsx("block text-sm text-center px-1 py-1 font-semibold", {
                "bg-genesis-gray-300 rounded-lg": isActive, 
                })}
              >
                Projects
              </span>
            );
          }}
        </NavLink>
        <NavLink to={"/organize/ventures"}>
          {({ isActive }) => {
            return (
              <span
              className={clsx("block text-sm text-center px-1 py-1 font-semibold", {
                "bg-genesis-gray-300 rounded-lg": isActive,  
                })}
              >
                Ventures
              </span>
            );
          }}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Organize;
