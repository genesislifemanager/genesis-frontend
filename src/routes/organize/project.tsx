import { TrashIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/api";
import { useQuery } from "react-query";

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

  const { isLoading, isError, data, error, isSuccess } = useQuery(["projects", id], () => getProjectById(id), {
    onSuccess: (data) => {
      setProjectName(data.name);
      setStatus(statuses[statuses.findIndex((status) => status.value === data.status)]);
      setDue(dayjs(data.s));
      setDuration({ h: data.duration.h.toString(), m: data.duration.m.toString() });
    },
  });

  if (isLoading) {
    return <div className="mt-4 flex justify-center  border-black">Loading</div>;
  }

  return (
    <div className="mt-4 border border-black">
      <div className="cursor-pointer flex justify-between items-center pr-4">
        <div className="flex items-center gap-x-4">
          <ChevronLeftIcon
            width={16}
            height={16}
            onClick={() => {
              navigate(-1);
            }}
          />
          <h1 className="text-xl font-semibold">{data.name}</h1>
        </div>
        <TrashIcon
          width={20}
          height={20}
          onClick={() => {
            // timeblockDeleteMutation.mutate(id);
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
}

export default Project;
