import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const Login = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      toast.success("You are already logged in");
      setTimeout(() => {
        window.location.href = "https://rdua-sankirtan-report.vercel.app"; // or your actual home route
      }, 1500); // Wait 1.5 seconds before redirecting
    }
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { mobileNumber, password } = formData;
      const { data } = await axios.post(
        `${baseURL}/auth/login-user`,
        {
          mobileNumber,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data);
      if (data.status == "success") {
        localStorage.setItem("jwt", data.token);
        toast.success("Login successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      console.error("Error Response:", error.response);
      const errorMessage =
        error.response?.data?.message || "User registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          {/* Logo Container with Sacred Geometry */}
          <div className=" mx-auto mb-4">
            <div className=" h-24 w-24 mx-auto flex items-center justify-center">
              {/* Replace this div with your actual logo */}
              <img
                src={logo}
                alt="Srila Prabhupada"
                className="h-20 w-20 rounded-full border-4 border-amber-500 object-contain "
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-amber-800 mb-1 font-serif">
            R.D.U.A Sankirtan Report
          </h1>
          <h2 className="text-xl text-amber-600 mb-2 font-serif">
            Hare Krishna !
          </h2>
          <p className="text-amber-900 italic">
            Read • Discuss • Understand • Apply
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 space-y-6 border border-purple-100 relative"
        >
          {/* upper border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"></div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">+91</span>
              </div>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                required
                className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your phone number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {/* <a
                href="/forgot-password"
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot password?
              </a> */}
            </div>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                className={`block w-full pl-10 pr-3 py-3 border border-gray-300
                 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
    ${
      loading
        ? "bg-purple-400 cursor-not-allowed"
        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    }
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 group`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              <>
                <span className="group-hover:scale-105 transition-transform">
                  Sign In
                </span>
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-purple-600 hover:text-purple-500 hover:underline"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
