import { useQuery } from "react-query";
import { getVentureById } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { getCurrentUser } from "../../firebase/auth";

function VentureProjects() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { isLoading: isUserLoading, data: user } = useQuery("user", getCurrentUser);

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ["ventures", id],
    () => getVentureById(user!.uid, id),
    {
      enabled: !!user,
    }
  );
  
  return (
    <div className="border-black px-4 py-4 bg-white rounded-xl mt-4 grid grid-cols-1 gap-y-2">
      {data.projects.map((project: any) => {
        return (
          <div
            onClick={() => {
              navigate(`/organize/projects/${project.id}`);
            }}
            key={project.id}
            className="   rounded-2xl px-4 py-4 bg-genesis-gray-700 cursor-pointer flex justify-between border-black items-center " 
          >
            <span className="block text-base">{project.name}</span>
            <div className="flex items-center">
              <ChevronRightIcon width={20} height={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VentureProjects;
