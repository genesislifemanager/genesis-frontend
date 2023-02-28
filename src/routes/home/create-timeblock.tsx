import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function CreateTimeBlock() {

  const navigate = useNavigate();

  return (
    <div className=" border-black">
      <div className="cursor-pointer flex gap-x-4 items-center">
        <ChevronLeftIcon width={20} height={20} onClick={()=>{
          navigate(-1);
        }}/>
        <h1 className="text-xl font-semibold">Create Time Block</h1>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default CreateTimeBlock;
