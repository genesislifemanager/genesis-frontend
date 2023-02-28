import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home/overview");
  }, []);

  return (
    <div className="mt-4 border-black">
      <div className="border border-black rounded-lg grid grid-cols-3 my-2">
        <NavLink to={"/home/overview"}>
          {({ isActive }) => {
            return (
              <span
                className={clsx("block text-center px-1 py-1 font-semibold", {
                  "border border-black rounded-lg": isActive,
                })}
              >
                Overview
              </span>
            );
          }}
        </NavLink>
        <NavLink to={"/home/timeblocks"}>
          {({ isActive }) => {
            return (
              <span
                className={clsx("block text-center px-1 py-1 font-semibold", {
                  "border border-black rounded-lg": isActive,
                })}
              >
                Time Blocks
              </span>
            );
          }}
        </NavLink>
        <NavLink to={"/home/calendar"}>
          {({ isActive }) => {
            return (
              <span
                className={clsx("block text-center px-1 py-1 font-semibold", {
                  "border border-black rounded-lg": isActive,
                })}
              >
                Calendar
              </span>
            );
          }}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
