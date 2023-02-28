import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { DateContext } from "../../contexts/DateContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

function SelectedDay() {
  const { selectedDate } = useContext(DateContext);

  return (
    <div className=" border-black">
      <h1 className="text-2xl font-semibold">Today</h1>
      <div className="mt-4 px-4">
        <NavLink to={"/home/timeblocks/create"}>
          <div className="border border-black flex justify-center px-2 py-2 rounded">
            <PlusCircleIcon width={20} height={20} />
          </div>
        </NavLink>

        <div className="grid grid-cols-1 border-black mt-2">
          <div className="border border-black px-4 py-2 rounded">
            <span className="block">SDGP Implementation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedDay;
