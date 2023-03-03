import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";

function Organize() {
  return (
    <div className="mt-4 border-black">
      <div className="border border-black rounded-lg grid grid-cols-2">
        <NavLink to={"/organize/projects"}>
          {({ isActive }) => {
            return (
              <span
                className={clsx("block text-center px-1 py-1 font-semibold", {
                  "border border-black rounded-lg": isActive,
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
                className={clsx("block text-center px-1 py-1 font-semibold", {
                  "border border-black rounded-lg": isActive,
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
