import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="root-layout lg:px-[30%]  border border-black py-16 px-4 flex flex-col justify-center items-center">
      <h1 className="text-6xl text-center text-genesis-green-300">Genesis</h1>
      <h2 className="text-2xl text-center mt-4">Hey, Welcome</h2>
      <h2 className="text-xl text-center mt-4">Start living an organized life using Genesis</h2>

      <div className="flex flex-col justify-center items-center mt-8">
        <Link to={"/auth/signup"} className="block w-80 text-center rounded-2xl bg-genesis-green-300 text-white border-black  px-16  py-2  ">
          Sign Up
        </Link >
        <Link to={"/auth/signin"} className="mt-4 w-80  block rounded-2xl bg-genesis-gray-300 text-black border-black  px-16  py-2  ">
          I already have an account
        </Link >
      </div>
    </div>
  );
}

export default Welcome;