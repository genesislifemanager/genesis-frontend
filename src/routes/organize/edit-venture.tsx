import clsx from "clsx";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getVentureById, updateVentureById } from "../../api/api";
import { getCurrentUser } from "../../firebase/auth";

function VentureEdit() {
  const { id } = useParams();
  const { isLoading:isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [ventureName, setVentureName] = useState("");
  const { isLoading, isError, data, error, isSuccess } = useQuery(["ventures", id], () => getVentureById(user!.uid ,id), {
    onSuccess: (data) => {
      setVentureName(data.name);
    },
    enabled:!!user
  });

  const [showNameError, setShowNameError] = useState(false);

  const ventureUpdateMutation = useMutation(updateVentureById, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
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

    ventureUpdateMutation.mutate({ uid:user!.uid, id: id, name: ventureName });
    navigate(-1);
  };

  if (isUserLoading || isLoading) {
    return <div className="mt-4 flex justify-center  border-black">Loading</div>;
  }

  return (
    <div className="mt-4">
       <form className="px-4 py-4  border-black mt-4 rounded-2xl bg-white">
        <div>
        <label htmlFor="name" className="block text-genesis-gray-800 text-base ">
          </label>
          <input
            id="name"
            value={ventureName}
            onChange={(e) => {
              setVentureName(e.target.value);
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
      </form>

      <div className="flex px-4 gap-x-4 border-black mt-4">
        <button
          onClick={() => {
            navigate(-1);
          }}
          type="button"
          className="border block border-black rounded px-1 py-1 text-sm  w-20"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          type="button"
          className="border block border-black rounded px-1 py-1 text-sm  w-20"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default VentureEdit;
