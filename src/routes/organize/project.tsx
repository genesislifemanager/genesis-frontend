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

const statuses = [
  { id: 1, label: "Open", value: "open" },
  { id: 2, label: "In Progress", value: "in progress" },
  { id: 3, label: "Closed", value: "closed" },
];

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [due, setDue] = useState<dayjs.Dayjs>(dayjs());
  const [duration, setDuration] = useState({ h: "0", m: "0" });

  const [venture, setVenture] = useState({ id: -1, name: "General", label: "General", value: "general" });


  const [showNameError, setShowNameError] = useState(false);
  const [showDurationError, setShowDurationError] = useState(false);

  const {
    isLoading:isVenturesLoading,
    data: ventures,
  } = useQuery("ventures", async () => {
    const ventures = await getAllVentures();
    return ventures.map((venture: any) => {
      return { ...venture, label: venture.name, value: venture.name.toLowerCase() };
    });
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

    projectUpdateMutation.mutate({ id:id, name: projectName, status: status.value, due, duration,ventureId:venture.id });
    navigate(-1);
  };

  const { isLoading:isProjectLoading, isError, data, error, isSuccess } = useQuery(["projects", id], () => getProjectById(id), {
    onSuccess: (data) => {
      setProjectName(data.name);
      setStatus(statuses[statuses.findIndex((status) => status.value === data.status)]);
      setDue(dayjs(data.s));
      setDuration({ h: data.duration.h.toString(), m: data.duration.m.toString() });
      setVenture(ventures.find((venture:any) => {
        return venture.id === data.ventureId;
      }))
    },
  });

  if (isProjectLoading || isVenturesLoading) {
    return <div className="mt-4 flex justify-center  border-black">Loading</div>;
  }

  return (
    <div className="mt-4  border-black">
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
            projectDeleteMutation.mutate(id);
            navigate(-1);
          }}
        />
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
                {statuses.map((status) => (
                  <Listbox.Option className={"cursor-pointer  text-sm px-1 py-1 "} key={status.id} value={status}>
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
                  "border mt-2 cursor-pointer text-sm px-1 py-1 rounded flex items-center justify-between border-black"
                }
              >
                <span className="block">{venture.label}</span>
                <ChevronDownIcon width={20} height={20} />
              </Listbox.Button>
              <Listbox.Options
                className={"border bg-slate-200 absolute z-10 left-0 right-0  mt-1 rounded border-black"}
              >
                {ventures.map((venture:any) => (
                  <Listbox.Option className={"cursor-pointer  text-sm px-1 py-1 "} key={venture.id} value={venture}>
                    {venture.label}
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
            onClick={handleSave}
            type="button"
            className="border block border-black rounded px-1 py-1 text-sm font-semibold w-20"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Project;
