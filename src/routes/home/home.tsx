import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { DateContext } from "../../contexts/DateContext";

function Home() {
  // const navigate = useNavigate();
  const [selectedDate,setSelectedDate] = useState<Date>(new Date());

  // useEffect(() => {
  //   navigate("/home/overview");
  // }, []);

  return (
    <div className="mt-4 border-black">
      <div className="border border-black rounded-lg grid grid-cols-3 my-2">
        <NavLink to={"/overview"}>
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
        <NavLink to={"/timeblocks"}>
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
        <NavLink to={"/calendar"}>
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
      <DateContext.Provider value={{selectedDate,setSelectedDate}}>
        <Outlet />
      </DateContext.Provider>
    </div>
  );
}

export default Home;
