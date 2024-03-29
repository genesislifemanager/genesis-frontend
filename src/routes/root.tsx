import { HomeIcon, Bars3Icon, Cog6ToothIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useQuery } from "react-query";
import { getCurrentUser, signOutUser } from "../firebase/auth";
import PromptDialog from "../components/prompt-dialog";

import { createNLPQuery } from "../api/api";

function Root() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { isLoading, data: user } = useQuery("user", getCurrentUser, {
    onSuccess(user) {
      if (!user) {
        navigate("/auth/signin");
      }
    },
  });

  const handlePromptOpen = async () => {
    setOpen(true);
  };

  const handlePromptClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="root-layout font-sans px-4 py-4  items-center flex justify-center border relative border-black">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="root-layout font-sans lg:mx-[30%] lg:px-2  rounded-xl px-4 py-4 lg:pt-2 lg:border-2 relative border-gray-500/40">
      <Header />
      <Outlet />
      <div className="flex bg-genesis-gray-300 justify-center rounded-lg left-4 right-4 lg:bottom-2 lg:left-2 lg:right-2  gap-x-16  bottom-4 absolute py-2 px-4  border-black">
        <NavLink to={"/organize/projects"}>
          <Bars3Icon width={24} height={24} />
        </NavLink>
        <NavLink to={"/home/timeblocks"}>
          <HomeIcon width={24} height={24} />
        </NavLink>
        <NavLink to={"/settings"}>
          <Cog6ToothIcon width={24} height={24} />
        </NavLink>
      </div>
      {/* <div
        onClick={handlePromptOpen}
        className="absolute w-12 h-12  bg-genesis-gray-600 border-black cursor-pointer rounded-xl bottom-20 flex items-center justify-center right-4"
      >
        <ChatBubbleOvalLeftEllipsisIcon width={24} height={24} className="text-genesis-green-300" />
      </div> */}

      <PromptDialog user={user} open={open} handlePromptClose={handlePromptClose} />
    </div>
  );
}

export default Root;
