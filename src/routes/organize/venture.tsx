import { TrashIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteVentureById, getVentureById, updateVentureById } from "../../api/api";

function Venture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ventureName, setVentureName] = useState("");

  const [showNameError, setShowNameError] = useState(false);

  const queryClient = useQueryClient();

  const ventureUpdateMutation = useMutation(updateVentureById, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
    },
  });

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

  const handleSave = () => {
    if (ventureName === "") {
      setShowNameError(true);
      const errtimer = setTimeout(() => {
        setShowNameError(false);
      }, 500);
      return;
    }

    ventureUpdateMutation.mutate({ id:id, name: ventureName });
    navigate(-1);
  };

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
            ventureDeleteMutation.mutate(id);
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
            value={ventureName}
            onChange={(e) => {
              setVentureName(e.target.value);
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
      </form>

      <div className="flex px-4 gap-x-4 border-black mt-4">
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
    </div>
  );
}

export default Venture;
