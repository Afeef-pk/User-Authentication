import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required";

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!mobile || !/^\d{10}$/.test(mobile))
      validationErrors.mobile = "Invalid Mobile Number";

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post(
        "http://localhost:4000/api/register",
        { name, email, mobile, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        toast.success(data.message);
        navigate('/login')
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response.data.message);
      });
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    clearError("name");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearError("email");
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    clearError("mobile");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearError("password");
  };

  return (
    <div className="flex justify-center bg-[#e9eef2] max-h-screen my-14">
      <div className="my-[5rem] mx-4 py-[1rem] bg-white rounded-lg w-[440px] shadow-lg ">
        <h2 className="text-darkBlue text-center text-3xl font-bold ">
          Sign up
        </h2>
        <form
          className="px-[3rem]  flex flex-col mt-[2rem]"
          onSubmit={handleSubmit}>
          <label className="text-sm text-darkBlue" htmlFor="name">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 "
          />
          {errors.name && (
            <p className="form-error text-red-600 text-xs mt-2">
              {errors.name}
            </p>
          )}
          <label className="text-sm text-darkBlue mt-4" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 "
          />
          {errors.email && (
            <p className="form-error text-red-600 text-xs mt-2">
              {errors.email}
            </p>
          )}
          <label className="text-sm text-darkBlue mt-4" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            value={mobile}
            onChange={handleMobileChange}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 "
          />
          {errors.mobile && (
            <p className="form-error text-red-600 text-xs mt-2">
              {errors.mobile}
            </p>
          )}
          <label className="text-sm text-darkBlue mt-4" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3"
          />
          {errors.password && (
            <p className="form-error text-red-600 text-xs mt-2">
              {errors.password}
            </p>
          )}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="border hover:bg-blue-500 hover:text-white bg-blue-400 border-darkBlue px-6 py-2 mt-4  rounded font-bold hover:shadow-md">
              Sign up
            </button>
          </div>
        </form>
        <div className="ml-[3rem]">
          <p className="text-sm my-3  text-lightBlue">
            Already have an account ?{" "}
            <Link to={"/login"} className="cursor-pointer underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
