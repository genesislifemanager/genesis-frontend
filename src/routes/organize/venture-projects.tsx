import { useQuery } from "react-query";
import { getVentureById } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

function VentureProjects() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data, error, isSuccess } = useQuery(["ventures", id], () => getVentureById(id));
  
  return (
    <div className="mt-4 grid grid-cols-1 gap-y-2">
      {data.projects.map((project: any) => {
        return (
          <div
            onClick={() => {
              navigate(`/organize/projects/${project.id}`);
            }}
            key={project.id}
            className="border  cursor-pointer flex justify-between border-black items-center px-4 py-2 rounded"
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
