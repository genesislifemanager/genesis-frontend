import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { DateContext } from "../../contexts/DateContext";
import dayjs from "dayjs";

function Home() {
  const [selectedDate,setSelectedDate] = useState(dayjs());

  return (
    <div className="mt-4  border-black">
    <div className="bg-genesis-gray-200 border-black rounded-xl px-1.5 py-1.5 grid grid-cols-2">  
        {/* <NavLink to={"/home/overview"}>
          {({ isActive }) => {
            return (
              <span
                    className={clsx("block text-center px-1 py-1 ", {
                  "border border-black rounded-lg": isActive,
                })}
              >
                Overview
              </span>
            );
          }}
        </NavLink> */}
        <NavLink to={"/home/timeblocks"}>
          {({ isActive }) => {
            return (
              <span
              className={clsx("block text-sm text-center px-1 py-1 ", {
                "bg-genesis-gray-300 rounded-lg": isActive, 
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
              className={clsx("block text-sm text-center px-1 py-1 ", {
                "bg-genesis-gray-300 rounded-lg": isActive,  
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
