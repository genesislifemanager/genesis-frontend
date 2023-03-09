import { ChangeEvent, MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../firebase/auth";

function SignUp() {
  const [formData, setFormData] = useState({ fname: "", lname: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: MouseEvent<HTMLButtonElement>) => {

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
    await signUpUser(formData.email, formData.password);
    navigate("/home/timeblocks");
  };

  return (
    <div className="min-h-screen border border-black py-16 px-4">
      <h1 className="text-center font-semibold text-2xl">Create an account</h1>
      <div className="mt-4 py-4 grid grid-cols-1 gap-y-4">
        <input
          type="text"
          onChange={handleFormDataChange}
          name="fname"
          className="border border-black w-full px-4 py-2 rounded"
          placeholder="First Name"
        />
        <input
          type="text"
          onChange={handleFormDataChange}
          name="lname"
          className="border border-black w-full px-4 py-2 rounded"
          placeholder="Last Name"
        />
        <input
          type="email"
          onChange={handleFormDataChange}
          name="email"
          className="border invalid:border-red-500 border-black w-full px-4 py-2 rounded"
          placeholder="Email Address"
        />
        <input
          type="password"
          onChange={handleFormDataChange}
          name="password"
          className="border border-black w-full px-4 py-2 rounded"
          placeholder="Password"
        />
        <input
          type="password"
          onChange={handleFormDataChange}
          name="confirmPassword"
          className="border border-black w-full px-4 py-2 rounded"
          placeholder="Confirm Password"
        />
        <button          
          onClick={handleSubmit}
          className="border border-black w-full px-4 py-2 rounded font-semibold"
        >
          Create Account
        </button>
      </div>
      <Link to="/auth/signin" className="block text-center">
        Already have an acccount ? Sign In
      </Link>
      <p className="text-center text-xs mt-2">
        By creating an account you agree to the <span className="underline">privacy policy</span>
      </p>
    </div>
  );
}

export default SignUp;
