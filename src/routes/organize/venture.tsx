import { TrashIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { deleteVentureById, getVentureById, updateVentureById } from "../../api/api";
import { NavLink } from "react-router-dom";

function Venture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ventureName, setVentureName] = useState("");

  const queryClient = useQueryClient();

  const ventureDeleteMutation = useMutation(deleteVentureById, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
    },
  });

  const { isLoading, isError, data, error, isSuccess } = useQuery(["ventures", id], () => getVentureById(id), {
    onSuccess: (data) => {
      setVentureName(data.name);
    },
  });

  if (isLoading) {
    return <div className="mt-4 flex justify-center  border-black">Loading</div>;
  }

  return (
    <div className="mt-4 border-black">
      <div className=" flex justify-between items-center pr-4">
        <div className="flex items-center gap-x-4">
          <ChevronLeftIcon
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => {
              navigate("/organize/ventures");
            }}
          />
          <h1 className="text-xl font-semibold">{ventureName}</h1>
        </div>
        <TrashIcon
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            ventureDeleteMutation.mutate(id);
            navigate(-1);
          }}
        />
      </div>
      <div className="mt-4 border flex flex-row items-center w-fit border-black rounded ">
        <NavLink to={`/organize/ventures/${id}/projects`}>
          {({ isActive }) => {
            return (
              <span
                className={clsx("block w-16 px-1 py-0.5 cursor-pointer text-center", {
                  "border border-black rounded": isActive,
                })}
              >
                Projects
              </span>
            );
          }}
        </NavLink>
        <NavLink to={`/organize/ventures/${id}/edit`}>
          {({ isActive }) => {
            return (
              <span
                className={clsx("block w-16 px-1 py-0.5 cursor-pointer text-center", {
                  "border border-black rounded": isActive,
                })}
              >
                Edit
              </span>
            );
          }}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Venture;
