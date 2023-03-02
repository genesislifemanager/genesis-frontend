import { PlusCircleIcon, ChevronRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DateContext } from "../../contexts/DateContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllTimeblocks } from "../../api/api";
import { useNavigate } from "react-router-dom";

function SelectedDay() {
  const { selectedDate } = useContext(DateContext);
  const { isLoading, isError, data, error, isSuccess } = useQuery("timeblocks", getAllTimeblocks);
  const navigate = useNavigate();

  const getFormattedTime = (dateTime:string) =>{
    const formattedTime = new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return formattedTime;
  }

  if (isLoading) {
    return (
      <div className="mt-4 border-black">
        <h1 className="text-2xl font-semibold">Today</h1>
        <div className="mt-4 ">
          <NavLink to={"/home/timeblocks/create"}>
            <div className="border border-black flex justify-center px-2 py-2 rounded">
              <PlusCircleIcon width={20} height={20} />
            </div>
          </NavLink>

          <div className="grid grid-cols-1 place-items-center border-black mt-2">
            <span className="block">Loading</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 border-black">
      <h1 className="text-2xl font-semibold">Today</h1>
      <div className="mt-4 ">
        <NavLink to={"/home/timeblocks/create"}>
          <div className="border border-black flex justify-center px-2 py-2 rounded">
            <PlusCircleIcon width={20} height={20} />
          </div>
        </NavLink>

        <div className="grid grid-cols-1 gap-y-2 mt-4 border-black">
          {data.map((timeblock: any) => {
            return (
              <div
                onClick={()=>{
                  navigate(`/home/timeblocks/${timeblock.id}`)
                }}
                key={timeblock.id}
                className="border flex justify-between border-black items-center px-4 py-2 rounded"
              >
                <span className="block text-base">{timeblock.name}</span>
                <div className="flex items-center">
                  <span className="text-base">{`${getFormattedTime(timeblock.s)} - ${getFormattedTime(timeblock.e)}`}</span>
                  <ChevronRightIcon width={20} height={20} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectedDay;
