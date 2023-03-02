import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
import { createTimeblock } from "../../api/api";
import clsx from "clsx";
import { useMutation, useQueryClient } from "react-query";

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
  const navigate = useNavigate();
  const [timeblockName, setTimeblockName] = useState("");
  const [type, setType] = useState(types[0]);
  const [mode, setMode] = useState(modes[0]);
  const [s, setS] = useState<Date | null>(new Date());
  const [duration, setDuration] = useState({ h: "0", m: "0" });
  const [project, setProject] = useState(projects[0]);

  const [showNameError, setShowNameError] = useState(false);
  const [showDurationError, setShowDurationError] = useState(false);

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration({ ...duration, [e.target.name]: e.target.value });
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

    if (duration.h === "0" && duration.m === "0") {
      setShowDurationError(true);
      const errtimer = setTimeout(() => {
        setShowDurationError(false);
      }, 500);
      return;
    }

    timeblockMutation.mutate({
      name: timeblockName,
      type: type.value,
      mode: mode.value,
      s,
      duration,
      project: null,
      reminder: null,
    });
    navigate(-1);
  };

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
      <form className="px-4">
        <div className="">
          <label htmlFor="name" className="block text-base font-semibold">
            Name
          </label>
          <input
            id="name"
            value={timeblockName}
            onChange={(e) => {
              setTimeblockName(e.target.value);
            }}
            className={clsx("border mt-2 border-black w-full text-sm rounded px-2 py-1", {
              "border-red-500": showNameError,
            })}
            name="name"
            type="text"
          />
          <p className={clsx("text-xs text-red-500", { block: showNameError, hidden: !showNameError })}>
            'Name' can't be empty
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-black">
          <div className="relative mt-4">
            <label className="block text-base font-semibold">Type</label>
            <Listbox value={type} onChange={setType}>
              <Listbox.Button
                as="div"
                className={
                  "border mt-2 cursor-pointer text-sm px-1 py-1 rounded flex items-center justify-between border-black"
                }
              >
                <span className="block">{type.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options
                className={"border bg-slate-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}
              >
                {types.map((type) => (
                  <Listbox.Option className={"cursor-pointer  text-sm px-1 py-1 "} key={type.id} value={type}>
                    {type.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative mt-4">
            <label className="block text-base font-semibold">Mode</label>
            <Listbox value={mode} onChange={setMode}>
              <Listbox.Button
                as="div"
                className={
                  "border mt-2 cursor-pointer text-sm px-1 py-1 rounded flex items-center justify-between border-black"
                }
              >
                <span className="block">{mode.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options className={"border bg-slate-200 z-10 absolute left-0 right-0 mt-1 rounded border-black"}>
                {modes.map((mode) => (
                  <Listbox.Option className={"cursor-pointer  text-sm px-1 py-1 "} key={mode.id} value={mode}>
                    {mode.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative">
            <label className="block text-base font-semibold">Project</label>
            <Listbox value={project} onChange={setProject}>
              <Listbox.Button
                as="div"
                className={
                  "border mt-2 cursor-pointer text-sm px-1 py-1 rounded flex items-center justify-between border-black"
                }
              >
                <span className="block">{project.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options className={"border bg-slate-200 z-10 absolute left-0 right-0 mt-1 rounded border-black"}>
                {projects.map((project) => (
                  <Listbox.Option className={"cursor-pointer  text-sm px-1 py-1 "} key={project.id} value={project}>
                    {project.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative">
            <label className="block text-base font-semibold">Start Time</label>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                ampm={false}
                value={s}
                onChange={(newS) => {
                  setS(newS);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="relative">
            <label className="block text-base font-semibold">Duration</label>
            <div className="mt-2 flex items-center gap-x-2">
              <input
                type="number"
                name="h"
                value={duration.h}
                onChange={handleDurationChange}
                className=" w-8 border text-center block border-black text-base px-1 py-1 rounded outline-none"
              />
              <span className="">:</span>
              <input
                type="number"
                name="m"
                value={duration.m}
                onChange={handleDurationChange}
                className=" w-8 border text-center block border-black text-base px-1 py-1 rounded outline-none"
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
            className="border block border-black rounded px-1 py-1 text-sm font-semibold w-20"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTimeBlock;
