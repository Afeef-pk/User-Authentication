import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

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
        "http://localhost:4000/api/login",
        { email, password },
        {
          headers: {
            withCredentials: true,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token",res.data.token)
        toast.success(res.data.message);
        navigate("/");
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
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearError("name");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearError("password");
  };

  return (
    <div className="flex justify-center bg-[#e9eef2] min-h-screen my-20">
      <div className="my-[3rem] mx-4 py-[3rem] bg-white rounded-lg w-[440px] h-[480px] shadow-lg ">
        <h2 className="text-darkBlue text-center text-3xl font-bold ">
          Sign In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="px-[3rem]  flex flex-col mt-[2rem]">
          <label className="text-sm text-darkBlue mt-4" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 "
            onChange={handleEmailChange}
            value={email}
          />
          {errors.email && (
            <p className="form-error text-red-600 text-xs mt-2">
              {errors.email}
            </p>
          )}
          <label className="text-sm text-darkBlue mt-5" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3"
            onChange={handlePasswordChange}
            value={password}
          />
          {errors.password && (
            <p className="form-error text-red-600 text-xs mt-2">
              {errors.password}
            </p>
          )}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="border border-darkBlue px-6 py-2 mt-5 text-darkBlue rounded font-bold hover:shadow-md">
              Login
            </button>
          </div>
        </form>
        <div className="ml-[3rem]">
          <p className="text-sm my-10 text-lightBlue">
            Don{"'"}t have an account?{" "}
            <Link to={"/signup"} className="cursor-pointer underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
