import { HomeIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Root() {

  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/home/overview");
  },[]);

  return (
    <div className="px-4 py-4 min-h-screen border relative border-black">
      <div className="border border-black py-4 px-4 rounded-lg">
        <span className="block text-base font-semibold">Hey, Sithmini</span>
        <div>
          <span className="block font-semibold text-2xl">18:04</span>
          <span className="block font-semibold text-xl">24th March 2023</span>
        </div>
      </div>
      <Outlet/>
      <div className="flex justify-center rounded-lg left-4 right-4 bottom-4 absolute py-2 px-4 border border-black">
        <HomeIcon width={24} height={24} />
      </div>
    </div>
  );
}

export default Root;
