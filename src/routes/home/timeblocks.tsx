import { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";

function TimeBlocks() {
  const {selectedDate} = useContext(DateContext);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Today</h1>
      <p>{selectedDate.toDateString()}</p>
    </div>
  );
}

export default TimeBlocks;
