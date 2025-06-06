import { useState,useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      toast.success("You are already logged in");
      setTimeout(() => {
        window.location.href = "http://localhost:5173"; // or your actual home route
      }, 1500); // Wait 1.5 seconds before redirecting
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { firstName, lastName, mobileNumber, password } = formData;
      const { data } = await axios.post(
        `${baseURL}/auth/register-user`,
        {
          firstName,
          lastName,
          mobileNumber,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      if (data.status == "success") {
        toast.success(data.message || "User registered successfully");
        navigateTo("/login");
      } else {
        toast.error(data.message || "User registration failed");
      }
    } catch (error) {
      console.log(error);
      console.error("Error Response:", error.response);
      const errorMessage =
        error.response?.data?.message || "User registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
  }};

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
            Hare Krishna!
          </h2>
          <p className="text-amber-900 italic">
            Read • Discuss • Understand • Apply
          </p>
        </div>

        {/* Form Container */}
        <form action="" onSubmit={handleRegister}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 space-y-6 border border-purple-100 relative">
            {/* Sacred Border Decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"></div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* mobileNumber */}
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500 font-serif">
                  Begin Bhakti
                </span>
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
                    Create Account
                  </span>
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already registered?{" "}
              <a
                href="/login"
                className="font-medium text-purple-600 hover:text-purple-500 hover:underline"
              >
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
