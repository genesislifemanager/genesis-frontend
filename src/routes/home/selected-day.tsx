import { PlusCircleIcon, PlusIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { DateContext } from "../../contexts/DateContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAllTimeblocks,
  getClosedTimeBlocksByDate,
  getOpenTimeBlocksByDate,
  updateTimeblockById,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import advancedFormat from "dayjs/plugin/advancedFormat";
import clsx from "clsx";
import { getCurrentUser } from "../../firebase/auth";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isTomorrow);
dayjs.extend(advancedFormat);

function SelectedDay() {
  const { selectedDate } = useContext(DateContext);

  const { isLoading:isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const {
    isIdle: isOpenTimeblocksIdle,
    isLoading: isOpenTimeblocksLoading,
    data: openTimeblocks,
  } = useQuery(
    ["timeblocks", selectedDate, { status: "open" }],
    () => getOpenTimeBlocksByDate(user!.uid, selectedDate),
    {
      enabled: !!user,
    }
  );
  
  const {
    isIdle: isClosedTimeblocksIdle,
    isLoading: isClosedTimeblocksLoading,
    data: closedTimeblocks,
  } = useQuery(
    ["timeblocks", selectedDate, { status: "closed" }],
    () => getClosedTimeBlocksByDate(user!.uid,selectedDate),
    {
      enabled: !!user,
    }
  );
  
  const queryClient = useQueryClient();

  const statusUpdateMutation = useMutation(updateTimeblockById, {
    onSuccess: () => {
      queryClient.invalidateQueries("timeblocks");
    },
  });

  const navigate = useNavigate();

  const getFormattedTime = (dateTime: string) => {
    return dayjs(dateTime).format("HH:mm");
  };

  const getHeadingForDate = (date: dayjs.Dayjs) => {
    if (date.isToday()) {
      return "Today";
    }
    if (date.isYesterday()) {
      return "Yesterday";
    }
    if (date.isTomorrow()) {
      return "Tomorrow";
    }
    return date.format("Do MMMM YYYY");
  };

  if (
    statusUpdateMutation.isLoading ||
    isUserLoading ||
    isOpenTimeblocksIdle ||
    isClosedTimeblocksIdle ||
    isClosedTimeblocksLoading ||
    isOpenTimeblocksLoading
  ) {
    return (
      <div className="mt-4 bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">  
        <h1 className="text-2xl ">{getHeadingForDate(selectedDate)}</h1>
        <div className="mt-4 ">
          <NavLink to={"/home/timeblocks/create"}>
          <div className="border-black flex justify-center px-2 py-2 rounded-1.5xl bg-genesis-green-300">
              <PlusCircleIcon width={20} height={20} className="text-white" />  
            </div>
          </NavLink>

          <div className="grid grid-cols-1 place-items-center border-black mt-2">
            <span className="block">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4  bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">
    <h1 className="text-2xl  ">{getHeadingForDate(selectedDate)}</h1>
    <div className="mt-4"> 
        <NavLink to={"/home/timeblocks/create"}>
        <div className=" border-black flex justify-center px-2 py-2 rounded-1.5xl bg-genesis-green-300">
            <PlusIcon width={20} height={20} className="text-white" /> 
          </div>
        </NavLink>

        <div>
        <div className="mt-4  px-4 bg-white py-4 rounded-2xl border-black">
            <h1 className="text-base font-medium">Open Timeblocks</h1>
            <TimeblockCards
              statusUpdateMutation={statusUpdateMutation}
              timeblocks={openTimeblocks}
              getFormattedTime={getFormattedTime}
            />
          </div>  

          <div className="mt-4 px-4 bg-white py-4 rounded-2xl border-black">
            <h1 className="text-base font-medium">Closed Timeblocks</h1>
            <TimeblockCards
              statusUpdateMutation={statusUpdateMutation}
              timeblocks={closedTimeblocks}
              getFormattedTime={getFormattedTime}
            />
            </div>
          </div>  
        </div>
      </div>
    );
}

function TimeblockCards({
  timeblocks,
  getFormattedTime,
  statusUpdateMutation,
}: {
  timeblocks: any;
  getFormattedTime: (dateTime: string) => string;
  statusUpdateMutation: any;
}) {
  if (timeblocks.length === 0) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-y-2 mt-2 border-black">
      <h1 className="text-xs">No timeblocks to view</h1>  
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-y-2 mt-2 border-black">
      {timeblocks.map((timeblock: any) => {
    return (
      <TimeBlockCard
        statusUpdateMutation={statusUpdateMutation}
        key={timeblock.id}
        timeblock={timeblock}
        getFormattedTime={getFormattedTime}
      />
    ); 
      })}
    </div>
  );
}

function TimeBlockCard({
  timeblock,
  getFormattedTime,
  statusUpdateMutation,
}: {
  timeblock: any;
  getFormattedTime: (dateTime: string) => string;
  statusUpdateMutation:any;
}) {
  const navigate = useNavigate();

  return (
    <div
    key={timeblock.id}
    className=" px-4 py-4 bg-genesis-gray-700 flex justify-between border-black items-center  rounded-2xl"
  >
      <div className="flex items-center gap-x-2">
      <RadioBtn timeblock={timeblock} statusUpdateMutation={statusUpdateMutation} />
        <span
            className={clsx("block  text-genesis-gray-500 text-sm", { "line-through": timeblock.status === "closed" })} 
            >
        {timeblock.name}
        </span>
      </div>
      <div className="flex items-center">
      <span
        className={clsx("text-xs text-genesis-purple-300 ", { "line-through": timeblock.status === "closed" })}
        >{`${getFormattedTime(timeblock.s)} - ${getFormattedTime(timeblock.e)}`}</span>
          <ChevronRightIcon
          width={20}
          className="text-genesis-gray-500 cursor-pointer"
          height={20}
          onClick={() => {
            navigate(`/home/timeblocks/${timeblock.id}`);
          }}
        />
      </div>
    </div>
  );
}

function RadioBtn({ timeblock, statusUpdateMutation }: { timeblock: any; statusUpdateMutation: any }) {
  const handleClickWhenOpen = () => {
    statusUpdateMutation.mutate({ ...timeblock, status: "closed" });
  };

  const handleClickWhenClosed = () => {
    statusUpdateMutation.mutate({ ...timeblock, status: "open" });
  };

  if (timeblock.status === "closed") {
    return( 
    <CheckCircleIcon 
    width={20} 
    height={20} 
    className="cursor-pointer text-genesis-gray-500" 
    onClick={handleClickWhenClosed} 
    />
    );
  }
  return (
    <span

      className="w-4 h-4 rounded-full  cursor-pointer block border box-border border-genesis-gray-500 bg-blackborder-black"
      onClick={handleClickWhenOpen}

    ></span>
  );
}

export default SelectedDay;
