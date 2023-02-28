import { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";

function TimeBlocks() {
  const { selectedDate } = useContext(DateContext);

  return (
    <Outlet/>
  );
}

export default TimeBlocks;
