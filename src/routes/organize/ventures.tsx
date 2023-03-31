import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllVentures } from "../../api/api";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { getCurrentUser } from "../../firebase/auth";

function Ventures() {
  const navigate = useNavigate();

  const { isLoading: isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const { isLoading, isError, data, error, isSuccess } = useQuery("ventures", () => getAllVentures(user!.uid), {
    enabled: !!user,
  
  });
  if (isUserLoading || isLoading) {
    return (
      <div className=" mt-4 bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">
      <h1 className="text-2xl font-semibold">Ventures</h1>
        <div className="mt-4">
          <NavLink to={"/home/timeblocks/create"}>
          <NavLink to={"/organize/ventures/create"}>
          <div className="border-black flex justify-center px-2 py-2 rounded-1.5xl bg-genesis-green-300">
            <PlusIcon width={20} height={20} className="text-white" />
          </div>
        </NavLink>  
        <div className="grid grid-cols-1 place-items-center border-black mt-2">
          <span className="block">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-4 bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">
      <h1 className="text-2xl font-semibold">Ventures</h1>
      <div className="mt-4">
        <NavLink to={"/organize/ventures/create"}>
        <div className="border-black flex justify-center px-2 py-2 rounded-1.5xl bg-genesis-green-300">
            <PlusIcon width={20} height={20} className="text-white" />
          </div>
        </NavLink>
      </div>
      <div className="border-black px-4 py-4 bg-white rounded-xl mt-4 grid grid-cols-1 gap-y-2">
        {data.map((venture: any) => {
          return (
            <div
              onClick={() => {
                navigate(`/organize/ventures/${venture.id}/projects`);
              }}
              key={venture.id}
              className="cursor-pointer rounded-2xl px-4 py-4 bg-genesis-gray-700 flex justify-between border-black items-center"
            >
              <span className="block text-base">{venture.name}</span>
              <div className="flex items-center">
                <ChevronRightIcon width={20} height={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ventures;
