import { Listbox } from "@headlessui/react";
import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField/TextField";
import dayjs from "dayjs";
import isNumber from "is-number";
import { useMutation, useQueryClient } from "react-query";
import { createProject } from "../../api/api";

const statuses = [
  { id: 1, label: "Open", value: "open" },
  { id: 2, label: "In Progress", value: "in progress" },
  { id: 3, label: "Closed", value: "closed" },
];

function CreateProject() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [due, setDue] = useState<dayjs.Dayjs>(dayjs());
  const [duration, setDuration] = useState({ h: "0", m: "0" });
  
  const [showNameError, setShowNameError] = useState(false);
  const [showDurationError, setShowDurationError] = useState(false);

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumber(e.target.value) || e.target.value === "") {
      setDuration({ ...duration, [e.target.name]: e.target.value });
    }
  };

  const queryClient = useQueryClient();

  const projectMutation = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  const handleConfirm = () => {
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

    projectMutation.mutate({ name: projectName, status: status.value, due, duration,ventureId:null });
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
        <h1 className="text-xl font-semibold">Create Project</h1>
      </div>
      <form className="px-4">
        <div>
          <label htmlFor="name" className="block text-base font-semibold">
            Name
          </label>
          <input
            id="name"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
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
                  "border mt-2 cursor-pointer text-sm px-1 py-1 rounded flex items-center justify-between border-black"
                }
              >
                <span className="block">{status.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options
                className={"border bg-slate-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}
              >
                {statuses.map((type) => (
                  <Listbox.Option className={"cursor-pointer  text-sm px-1 py-1 "} key={type.id} value={type}>
                    {type.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <div className="relative">
            <label className="block text-base font-semibold">Duration</label>
            <div className="mt-2 flex items-center gap-x-2">
              <input
                type="text"
                name="h"
                value={duration.h}
                onChange={handleDurationChange}
                className=" w-8 border text-center block border-black text-base px-1 py-1 rounded outline-none"
              />
              <span className="">:</span>
              <input
                type="text"
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

export default CreateProject;
