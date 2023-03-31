import { TrashIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { deleteVentureById, getVentureById, updateVentureById } from "../../api/api";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../../firebase/auth";

function Venture() {
  const { id } = useParams();
  console.log(id);
  
  const { isLoading:isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const navigate = useNavigate();

  const [ventureName, setVentureName] = useState("");

  const queryClient = useQueryClient();

  const ventureDeleteMutation = useMutation(deleteVentureById, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
    },
  });

  const { isLoading, isError, data, error, isSuccess } = useQuery(["ventures", id], () => getVentureById(user!.uid, id), {
    onSuccess: (data) => {
      setVentureName(data.name);
    },
    enabled:!!user
  });

  if (isUserLoading || isLoading) {
    return <div className="mt-4 bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">Loading</div>;
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
            ventureDeleteMutation.mutate({uid:user!.uid, id:id});
            navigate(-1);
          }}
        />
      </div>
         
      <div className="mt-4 bg-white  px-1 py-1 rounded-xl flex flex-row items-center w-fit border-black  ">
        <NavLink to={`/organize/ventures/${id}/projects`}>
          {({ isActive }) => {
            return (
              <span
                className={clsx("block w-16 px-1 py-0.5 cursor-pointer text-center", {
                  "bg-genesis-gray-300 rounded-lg": isActive,
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
                  "bg-genesis-gray-300 rounded-lg": isActive,
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
