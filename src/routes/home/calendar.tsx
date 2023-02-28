import { DateContext } from "../../contexts/DateContext";
import { useContext } from "react";

function Calendar() {
  const {selectedDate,setSelectedDate} = useContext(DateContext);

  const handleUpdate = () =>{
    setSelectedDate(new Date("2023-03-03"));
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Calendar</h1>
      <p>{selectedDate.toLocaleDateString()}</p>
      <button type="button" onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Calendar;
