import { ChangeEvent, MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../firebase/auth";
import { useMutation } from "react-query";

function SignUp() {
  const [formData, setFormData] = useState({ fname: "", lname: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const signUpMutation = useMutation(signUpUser, {
    onSuccess: () => {
      navigate("/home/timeblocks");
    },
  });

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (
      formData.fname === "" ||
      formData.lname === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      return;
    }
    if (formData.password !== formData.confirmPassword) return;

   signUpMutation.mutate({email:formData.email, password:formData.password, formData:formData})
  };

  if (signUpMutation.isLoading) {
    return (
      <div className="root-layout lg:px-[30%] font-sans px-4 py-4  items-center flex justify-center border relative border-black">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="root-layout lg:px-[30%] border border-black py-16 px-4">
      <h1 className="text-center  text-2xl">Create an account</h1>
      <div className="mt-4 py-4 grid grid-cols-1 gap-y-4">
      <h1 className="text-base">Name</h1>
        <input
          type="text"
          onChange={handleFormDataChange}
          name="fname"
          className="border-black w-full px-4 py-2 rounded-lg bg-genesis-gray-200"
          placeholder="First Name"
        />
        <input
          type="text"
          onChange={handleFormDataChange}
          name="lname"
          className="border-black w-full px-4 py-2 rounded-lg bg-genesis-gray-200"
          placeholder="Last Name"
        />
        <h1 className="text-base">Email</h1>
        <input
          type="email"
          onChange={handleFormDataChange}
          name="email"
          className="border-black w-full px-4 py-2 rounded-lg bg-genesis-gray-200"
          placeholder="Email Address"
          />
          <h1 className="text-base">Password</h1>
        <input
          type="password"
          onChange={handleFormDataChange}
          name="password"
          className="border-black w-full px-4 py-2 rounded-lg bg-genesis-gray-200"
          placeholder="Password"
        />
        <input
          type="password"
          onChange={handleFormDataChange}
          name="confirmPassword"
          className="border-black w-full px-4 py-2 rounded-lg bg-genesis-gray-200"
          placeholder="Confirm Password"
        />
        <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit}
            className="block rounded-2xl bg-genesis-green-300 text-white border-black w-fit px-16  py-2  "
          >
            Create Account
          </button>
        </div>
      </div>
      <Link to="/auth/signin" className="block text-center">
      Already have an acccount ? <span className="underline">Sign In</span>
      </Link>
      <p className="text-center text-xs mt-2">
        By creating an account you agree to the <span className="underline">privacy policy</span>
      </p>
    </div>
  );
}

export default SignUp;
