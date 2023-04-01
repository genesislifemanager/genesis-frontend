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

  const { isLoading: isUserLoading, data: user } = useQuery("user", getCurrentUser);

  if (isUserLoading) {
    return (
      <div className="bg-genesis-gray-200 border-black py-4 px-4 rounded-xl">
      <span className="block text-genesis-green-300 text-base ">Loading...</span>
      <div>
      <span className="block  text-4xl">{time.format("HH:mm")}</span>
        <span className="block  text-base">{dayjs().format("Do MMMM YYYY")}</span> 
        </div>
      </div>
    );
  }

  return (
    <div className="bg-genesis-gray-200 border-black py-4 px-4 rounded-xl">
       <span className="block text-genesis-green-300 text-base ">Hey, {user?.displayName}</span>
      <div>
      <span className="block  text-4xl">{time.format("HH:mm")}</span>
        <span className="block  text-base">{dayjs().format("Do MMMM YYYY")}</span>
      </div>
    </div>
  );
}

export default Header;