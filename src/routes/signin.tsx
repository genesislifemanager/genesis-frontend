import { ChangeEvent, MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../firebase/auth";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (formData.email === "" || formData.password === "") return;
    await signInUser(formData.email, formData.password);
    navigate("/home/timeblocks");
  };

  return (
    <div className="root-layout border border-black py-16 px-4">
      <h1 className="text-center  text-2xl">Sign in to your account</h1>
      <div className="mt-4 py-4 grid grid-cols-1 gap-y-4">
        <input
          type="email"
          onChange={handleFormDataChange}
          name="email"
          className="border-black w-full px-4 py-2 rounded-lg bg-genesis-gray-200"
          placeholder="Email Address"
        />
        <input
          type="password"
          onChange={handleFormDataChange}
          name="password"
          className="border-black w-full px-4 py-2 rounded-lg bg-genesis-gray-200"
          placeholder="Password"
        />

         <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit}
            className="block rounded-2xl bg-genesis-green-300 text-white border-black w-fit px-16  py-2  "
          >
            Sign In
          </button>
        </div>
        </div>
      <Link to="/auth/signup" className="block text-center">
      Dont have an account ? <span className="underline">Sign Up</span> 
      </Link>
    </div>
  );
}

export default SignIn;
