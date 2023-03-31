import { TrashIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProjectById,deleteProjectById, getAllVentures } from "../../api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import clsx from "clsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker";
import TextField from "@mui/material/TextField/TextField";
import { Listbox } from "@headlessui/react";
import isNumber from "is-number";
import { getCurrentUser } from "../../firebase/auth";

const statuses = [
  { id: 1, label: "Open", value: "open" },
  { id: 2, label: "In Progress", value: "in progress" },
  { id: 3, label: "Closed", value: "closed" },
];

function Project() {
  const { id } = useParams();
  const { isLoading:isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [due, setDue] = useState<dayjs.Dayjs>(dayjs());
  const [duration, setDuration] = useState({ h: "0", m: "0" });

  const [venture, setVenture] = useState({ id: -1, name: "General", label: "General", value: "general" });


  const [showNameError, setShowNameError] = useState(false);
  const [showDurationError, setShowDurationError] = useState(false);

  const {
    isIdle:isVenturesIdle,
    isLoading:isVenturesLoading,
    data: ventures,
  } = useQuery("ventures", async () => {
    const ventures = await getAllVentures(user!.uid);
    return ventures.map((venture: any) => {
      return { ...venture, label: venture.name, value: venture.name.toLowerCase() };
    });
  },{
    enabled:!!user
  });

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumber(e.target.value) || e.target.value === "") {
      setDuration({ ...duration, [e.target.name]: e.target.value });
    }
  };

  const queryClient = useQueryClient();

  const projectUpdateMutation = useMutation(updateProjectById, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
    },
  });

  const projectDeleteMutation = useMutation(deleteProjectById, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
    },
  });


  const handleSave = () => {
    if (projectName === "") {
      setShowNameError(true);
      const errtimer = setTimeout(() => {
        setShowNameError(false);
      }, 500);
      return;
    }

    if ((duration.h === "0" && duration.m === "0") || duration.h === "" || duration.m === "") {
      setShowDurationError(true);
      const errtimer = setTimeout(() => {
        setShowDurationError(false);
      }, 500);
      return;
    }

    projectUpdateMutation.mutate({ uid:user!.uid, id:id, name: projectName, status: status.value, due, duration,ventureId:venture.id });
    navigate(-1);
  };

  const { isIdle:isProjectsIdle, isLoading:isProjectLoading, isError, data, error, isSuccess } = useQuery(["projects", id], () => getProjectById(user!.uid,id), {
    onSuccess: (data) => {
      console.log(data);
      
      setProjectName(data.name);
      setStatus(statuses[statuses.findIndex((status) => status.value === data.status)]);
      setDue(dayjs(data.due));
      setDuration({ h: data.duration.h.toString(), m: data.duration.m.toString() });
      setVenture(ventures.find((venture:any) => {
        return venture.id === data.ventureId;
      }))
    },
    enabled:!!user
  });

  if (isUserLoading ||  isProjectsIdle || isVenturesIdle || isProjectLoading || isVenturesLoading) {
    return <div className="mt-4 flex justify-center  border-black">Loading</div>;
  }

  return (
    <div className="mt-4 bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">
      <div className=" flex justify-between items-center pr-4">
        <div className="flex items-center gap-x-4">
          <ChevronLeftIcon
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <h1 className="text-xl font-semibold">{data.name}</h1>
        </div>
        <TrashIcon
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            projectDeleteMutation.mutate({uid:user!.uid, id:id});
            navigate(-1);
          }}
        />
      </div>

      <form className="px-4 py-4  border-black mt-4 rounded-2xl bg-white">
        <div>
          <label htmlFor="name" className="block text-base font-semibold">
          Project Name
          </label>
          <input
            id="name"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
            className={clsx(
              " bg-genesis-gray-200 mt-2 text-genesis-purple-300 border-black w-full text-sm rounded-lg px-1 py-1",
              {
                "border-red-500": showNameError,
              }
            )}
            name="name"
            type="text"
          />
          <p className={clsx("text-xs text-red-500", { block: showNameError, hidden: !showNameError })}>
            'Name' can't be empty
          </p>
        </div>

        <div className="grid mt-4 grid-cols-2 gap-4 border-black">
          <div className="relative">
            <label className="block text-base font-semibold">Due</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                ampm={false}
                renderInput={(props) => <TextField {...props} />}
                value={due}
                onChange={(newValue) => {
                  setDue(newValue as dayjs.Dayjs);
                }}
              />
            </LocalizationProvider>
          </div>

          <div className="relative ">
            <label className="block text-base font-semibold">Status</label>
            <Listbox value={status} onChange={setStatus}>
              <Listbox.Button
                as="div"
                className={
                  "text-genesis-purple-300 mt-2 bg-genesis-gray-200 cursor-pointer text-sm px-1 py-1 rounded-lg flex items-center justify-between border-black"
                }
              >
                <span className="block">{status.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options
               className={" outline-none bg-genesis-gray-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}
              >
                {statuses.map((status) => (
                  <Listbox.Option className={"cursor-pointer text-genesis-purple-300   text-sm px-1 py-1 "} key={status.id} value={status}>
                    {status.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative ">
            <label className="block text-base font-semibold">Venture</label>
            <Listbox value={venture} onChange={setVenture}>
              <Listbox.Button
                as="div"
                className={
                  "text-genesis-purple-300 mt-2 bg-genesis-gray-200 cursor-pointer text-sm px-1 py-1 rounded-lg flex items-center justify-between border-black"
                }
              >
                <span className="block">{venture.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options
                 className={" outline-none bg-genesis-gray-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}
              >
                  {ventures.map((venture: any) => (
                  <Listbox.Option className={"cursor-pointer text-genesis-purple-300   text-sm px-1 py-1 "} key={venture.id} value={venture}>
                    {venture.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative">
          <label className="block text-genesis-gray-800 text-base font-semibold">Duration</label>
            <div className="mt-2 flex items-center gap-x-2">
            <span className="text-sm font-semibold text-genesis-gray-800">H</span>
              <input
                type="text"
                name="h"
                value={duration.h}
                onChange={handleDurationChange}
                className=" w-8  text-genesis-purple-300 text-center block border-black text-base px-1 py-1 rounded-lg bg-genesis-gray-200 outline-none"
              />
              <span className="">:</span>
              <span className="text-sm font-semibold text-genesis-gray-800">M</span>
              <input
                type="text"
                name="m"
                value={duration.m}
                onChange={handleDurationChange}
                className=" w-8 text-genesis-purple-300  text-center block border-black text-base px-1 py-1 rounded-lg bg-genesis-gray-200 outline-none"
              />
            </div>
            <p className={clsx("text-xs text-red-500", { block: showDurationError, hidden: !showDurationError })}>
              Both hours and minutes can't be '0'
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 border-black mt-4">
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
            className="border-2 text-genesis-gray-800 block border-genesis-gray-800 rounded-lg px-1 py-2 text-sm font-semibold w-20"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className=" block border-black bg-genesis-green-300 text-white rounded-lg px-1 py-2 text-sm font-semibold w-20"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Project;
