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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createProject, createVenture } from "../../api/api";
import { getCurrentUser } from "../../firebase/auth";

function CreateVenture() {
  const navigate = useNavigate();
  
  const { isLoading: isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const [ventureName, setVentureName] = useState("");
  
  const [showNameError, setShowNameError] = useState(false);
  
  const queryClient = useQueryClient();

  const ventureMutation = useMutation(createVenture, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventures");
    },
  });

  const handleConfirm = () => {
    if (ventureName === "") {
      setShowNameError(true);
      const errtimer = setTimeout(() => {
        setShowNameError(false);
      }, 500);
      return;
    }

    ventureMutation.mutate({ uid: user!.uid, name: ventureName });
  };

return (
    <div className="mt-4 border-black">
       <div className="mt-4 bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">
        <ChevronLeftIcon
          width={20}
          height={20}
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="text-xl font-semibold">Create Venture</h1>
      </div>
      
      <form className="px-4 py-4  border-black mt-4 rounded-2xl bg-white">
        <div>
        <label htmlFor="name" className="block text-genesis-gray-800 text-base font-semibold">
            Venture Name
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

export default CreateVenture;
