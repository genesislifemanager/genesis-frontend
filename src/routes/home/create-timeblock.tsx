import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
import { createTimeblock, getAllProjects } from "../../api/api";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import isNumber from "is-number";
import { DateContext } from "../../contexts/DateContext";
import dayjs from "dayjs";
import { getCurrentUser } from "../../firebase/auth";

const types = [
  { id: 1, label: "Task", value: "task" },
  { id: 2, label: "Event", value: "event" },
  { id: 3, label: "Routine", value: "routine" },
];
const modes = [
  { id: 1, label: "Static", value: "static" },
  { id: 2, label: "Dynamic", value: "dynamic" },
];
const projects = [
  { id: 1, label: "None", value: "none" },
  { id: 2, label: "Genesis", value: "genesis" },
  { id: 3, label: "Mobile", value: "mobile" },
];

function CreateTimeBlock() {
  const { selectedDate } = useContext(DateContext);

  const { isLoading: isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const navigate = useNavigate();
  const [timeblockName, setTimeblockName] = useState("");
  const [type, setType] = useState(types[0]);
  const [mode, setMode] = useState(modes[0]);
  const [s, setS] = useState<dayjs.Dayjs>(selectedDate);
  const [duration, setDuration] = useState({ h: "0", m: "0" });

  const [project, setProject] = useState({
    id: -1,
    name: "None",
    duration: null,
    ventureId: null,
    due: null,
    status: null,
    label: "None",
    value: "none",
  });

  const [showNameError, setShowNameError] = useState(false);
  const [showDurationError, setShowDurationError] = useState(false);

  const {
    isLoading,
    isError,
    data: projects,
    error,
    isSuccess,
  } = useQuery(
    "projects",
    async () => {
      const data = await getAllProjects(user!.uid);
      return data.map((project: any) => {
        return { ...project, label: project.name, value: project.name.toLowerCase() };
      });
    },
    {
      enabled: !!user,
    }
  );

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumber(e.target.value) || e.target.value === "") {
      setDuration({ ...duration, [e.target.name]: e.target.value });
    }
  };

  const queryClient = useQueryClient();

  const timeblockMutation = useMutation(createTimeblock, {
    onSuccess: () => {
      queryClient.invalidateQueries("timeblocks");
    },
  });

  const handleConfirm = async () => {
    if (timeblockName === "") {
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

    timeblockMutation.mutate({
      uid: user!.uid,
      name: timeblockName,
      type: type.value,
      mode: mode.value,
      s,
      duration,
      projectId: project.id,
      reminder: null,
    });

    navigate(-1);
  };

  if (isLoading || isUserLoading) {
    return (
      <div className="mt-4 border-black">
        <div className="cursor-pointer flex gap-x-4 items-center">
          <ChevronLeftIcon
            width={20}
            height={20}
            onClick={() => {
              navigate(-1);
            }}
          />
          <h1 className="text-xl font-semibold">Create Time Block</h1>
        </div>

        <div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">
      <div className="cursor-pointer flex gap-x-4 items-center">
        <ChevronLeftIcon
          width={20}
          height={20}
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="text-xl font-semibold">Create Time Block</h1>
      </div>

      <form className="px-4 py-4  border-black mt-4 rounded-2xl bg-white">
        <div>
        <label htmlFor="name" className="block text-genesis-gray-800 text-base font-semibold">
            Timeblock Name
          </label>
          <input
            id="name"
            value={timeblockName}
            onChange={(e) => {
              setTimeblockName(e.target.value);
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

        <div className="grid grid-cols-2 gap-4 border-black">
          <div className="relative mt-4">
          <label className="block text-base text-genesis-gray-800 font-semibold">Type</label>
            <Listbox value={type} onChange={setType}>
              <Listbox.Button
                as="div"
                className={
                  "text-genesis-purple-300 mt-2 bg-genesis-gray-200 cursor-pointer text-sm px-1 py-1 rounded-lg flex items-center justify-between border-black"
                }
              >
                <span className="block">{type.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options
                className={" outline-none bg-genesis-gray-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}
              >
                {types.map((type) => (
                  <Listbox.Option
                  className={"cursor-pointer text-genesis-purple-300   text-sm px-1 py-1 "}
                  key={type.id}
                  value={type}
                >
                    {type.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative mt-4">
          <label className="block text-base text-genesis-gray-800 font-semibold">Mode</label>
            <Listbox value={mode} onChange={setMode}>
              <Listbox.Button
                as="div"
                className={
                  "mt-2  cursor-pointer rounded-lg text-sm px-1 py-1 text-genesis-purple-300 bg-genesis-gray-200 flex items-center justify-between border-black"
                }
              >
                <span className="block">{mode.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options className={"outline-none bg-genesis-gray-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}>
                {modes.map((mode) => (
                   <Listbox.Option className={"cursor-pointer text-genesis-purple-300   text-sm px-1 py-1 "} key={mode.id} value={mode}>
                    {mode.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative">
          <label className="block text-genesis-gray-800 text-base font-semibold">Project</label>
            <Listbox value={project} onChange={setProject}>
              <Listbox.Button
                as="div"
                className={
                  "mt-2  cursor-pointer rounded-lg text-sm px-1 py-1 text-genesis-purple-300 bg-genesis-gray-200 flex items-center justify-between border-black"
                }
              >
                <span className="block">{project.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options className={"outline-none bg-genesis-gray-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}>
                {projects.map((project: any) => (
                <Listbox.Option className={"cursor-pointer text-genesis-purple-300   text-sm px-1 py-1 "} key={project.id} value={project}>  
                    {project.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative">
          <Listbox.Option className={"cursor-pointer text-genesis-purple-300   text-sm px-1 py-1 "} key={project.id} value={project}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                ampm={false}
                value={s}
                onChange={(newS) => {
                  setS(newS as dayjs.Dayjs);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="relative">
          <label className="block text-genesis-gray-800 text-base font-semibold">Duration</label>
            <div className="mt-2 flex items-center gap-x-2">
              <input
                type="text"
                name="h"
                value={duration.h}
                onChange={handleDurationChange}
                className=" w-8  text-genesis-purple-300 text-center block border-black text-base px-1 py-1 rounded-lg bg-genesis-gray-200 outline-none" 
              />
              <span className="">:</span>
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
            className="border block border-black rounded px-1 py-1 text-sm font-semibold w-20"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            className=" block border-black bg-genesis-green-300 text-white rounded-lg px-1 py-2 text-sm font-semibold w-20"  
            >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTimeBlock;
