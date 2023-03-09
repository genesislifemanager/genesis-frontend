import { useEffect, useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useQuery } from "react-query";
import { getCurrentUser } from "../firebase/auth";
dayjs.extend(advancedFormat);

function Header() {
  const [time, setTime] = useState(dayjs());


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  

  return (
    <div className="border border-black py-4 px-4 rounded-lg">
      <span className="block text-base font-semibold">Hey, Sithmini</span>
      <div>
        <span className="block font-semibold text-2xl">{time.format("HH:mm:ss")}</span>
        <span className="block font-semibold text-xl">{dayjs().format("Do MMMM YYYY")}</span>
      </div>
    </div>
  );
}

export default Header;
