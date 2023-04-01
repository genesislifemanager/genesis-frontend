import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { signOutUser } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

function Settings() {

  const navigate = useNavigate()

  return (
    <div className="mt-4 border-black">
    <h1 className="text-2xl ">Settings</h1>
      <h1 className="text-xl mt-4 ">Account Settings</h1>
      <div className="mt-4 grid grid-cols-1 gap-y-2">
        <div
          onClick={async ()=>{
            await signOutUser();
            navigate("/auth/signin")
          }}
          className="px-4 py-4 cursor-pointer bg-genesis-gray-700 flex justify-between border-black items-center  rounded-2xl"
        >
         <span className="block text-base">Sign Out</span> 
          <div className="flex items-center">
            <ChevronRightIcon width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
