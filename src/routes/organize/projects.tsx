import { NavLink, useNavigate } from "react-router-dom";
import { PlusCircleIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import { getAllProjects, getAllVentures } from "../../api/api";
import { getCurrentUser } from "../../firebase/auth";

function Projects() {
  const navigate = useNavigate();
  
  const { isLoading: isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const {
    isLoading,
    isError,
    data: ventures,
    error,
    isSuccess,
  } = useQuery(
    "ventures",
    async () => {
      const data = await getAllVentures(user!.uid);
      return data;
    },
    {
      enabled: !!user,
    }
  ); 
  
  if (isLoading) {
    return (
      <div className=" bg-genesis-gray-200 px-4 py-4 rounded-xl border-black">
        <h1 className="text-2xl ">Projects</h1>
        <div className="mt-4">
        <NavLink to={"/organize/projects/create"}>
          <div className="border-black flex justify-center px-2 py-2 rounded-1.5xl bg-genesis-green-300">
            <PlusIcon width={20} height={20} className="text-white" />
          </div>
        </NavLink>
        </div>
        <div className="grid grid-cols-1 place-items-center border-black mt-2">
          <span className="block">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-genesis-gray-200 px-4 py-4 rounded-xl border-black mt-4">
        <h1 className="text-2xl ">Projects</h1>
      <div className="mt-4">
        <NavLink to={"/organize/projects/create"}>
        <div className="border-black flex justify-center px-2 py-2 rounded-1.5xl bg-genesis-green-300">
            <PlusIcon width={20} height={20} className="text-white" /> 
          </div>
        </NavLink>
      </div>

      <div>
        {ventures.map((venture: any) => {
          return (
            <div key={venture.id} className="mt-4">
              <div
                className="flex gap-x-4 items-center cursor-pointer"
                onClick={() => {
                  navigate(`/organize/ventures/${venture.id}/projects`);
                }}
              >
               <span className="text-xl block ">{venture.name}</span>
                <ChevronRightIcon width={16} height={16} />
              </div>
              <div className=" border-black px-4 py-4 bg-white rounded-xl mt-4 grid grid-cols-1 gap-y-2">
                {venture.projects.map((project: any) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/organize/projects/${project.id}`);
                      }}
                      key={project.id}
                      className="  cursor-pointer rounded-2xl px-4 py-4 bg-genesis-gray-700 flex justify-between border-black items-center "
                    >
                      <span className="block text-base">{project.name}</span>
                      <div className="flex items-center">
                        <ChevronRightIcon width={20} height={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
