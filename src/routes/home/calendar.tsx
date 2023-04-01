import { DateContext } from "../../contexts/DateContext";
import { useContext, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker/StaticDatePicker";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function Calendar() {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const [date, setDate] = useState<dayjs.Dayjs>(selectedDate);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (date) {
      setSelectedDate(date);
      navigate("/home/timeblocks")
    }
  };

  return (
    <div className="mt-4  border-black px-4 py-4 rounded-xl bg-genesis-gray-200">
      <h1 className="text-2xl ">Select Date</h1>
      <div className="mt-4 calendar border-black">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker

            displayStaticWrapperAs="desktop"
            openTo="day"
            value={date}
            onChange={(newDate) => {
              setDate(newDate as dayjs.Dayjs);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="flex gap-x-4 border-black mt-4">
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
            className="border-2 text-genesis-gray-800 block border-genesis-gray-800 rounded-lg px-1 py-2 text-sm  w-20"
            >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            type="button"
            className=" block border-black bg-genesis-green-300 text-white rounded-lg px-1 py-2 text-sm  w-20"
            >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
