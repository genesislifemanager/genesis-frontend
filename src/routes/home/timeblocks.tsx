import { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";

function  TimeBlocks() {
  
  return (
    <Outlet/>
  );
}

export default TimeBlocks;
