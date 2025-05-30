import Tooltip from "../Components/Tooltip";
import { useState, forwardRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaInfoCircle } from "react-icons/fa";

const SankirtanForm = forwardRef(({ onSuccess }, ref) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: today,
    groupName: "",
    numberOfBooksDistributed: "",
    krishnaKathaPoints: "",
    sankirtanPoints: "",
    gaurNitaiPleasingPoints: "",
  });

  const groups = [
    "Nityananda R.D.U.A.",
    "Prabhupada R.D.U.A.",
    "R.D.U.A. Kathamritam",
    "Bodhayantah parasparam R.D.U.A.",
    "Balarama R.D.U.A.",
    "Gauranga R.D.U.A.",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        date,
        groupName,
        numberOfBooksDistributed,
        krishnaKathaPoints,
        sankirtanPoints,
        gaurNitaiPleasingPoints,
      } = formData;
      
      const { data } = await axios.post(
        `${baseURL}/report/add-report`,
        {
          date,
          groupName,
          numberOfBooksDistributed,
          krishnaKathaPoints,
          sankirtanPoints,
          gaurNitaiPleasingPoints,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === "success") {
        toast.success(data.message);
        // Reset form
        setFormData({
          date: today,
          groupName: "",
          numberOfBooksDistributed: "",
          krishnaKathaPoints: "",
          sankirtanPoints: "",
          gaurNitaiPleasingPoints: "",
        });
        // Call success handler if provided
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error Response:", error.response);
      const errorMessage =
        error.response?.data?.message || "Failed to submit report";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date Input */}
      <div className="relative">
        <Tooltip content="Select the date for this report (past dates only)">
          <label className="block text-amber-900 font-medium mb-1">
            Date
            <button
              type="button"
              className="ml-2 text-amber-600 hover:text-amber-800"
            >
              <FaInfoCircle className="inline" />
              <span className="sr-only">Information</span>
            </button>
          </label>
        </Tooltip>

        <input
          type="date"
          max={today}
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          required
        />
      </div>

      {/* Group Dropdown */}
      <div className="relative">
        <Tooltip content="Select your R.D.U.A group">
          <label className="block text-amber-900 font-medium mb-1">
            Group
            <button
              type="button"
              className="ml-2 text-amber-600 hover:text-amber-800"
            >
              <FaInfoCircle className="inline" />
              <span className="sr-only">Information</span>
            </button>
          </label>
        </Tooltip>

        <select
          value={formData.groupName}
          onChange={(e) =>
            setFormData({ ...formData, groupName: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white"
          required
        >
          <option value="">Select your group</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {/* Books Distributed */}
      <div className="relative">
        <Tooltip content="Enter the number of books you distributed today">
          <label className="block text-amber-900 font-medium mb-1">
            Books Distributed
            <button
              type="button"
              className="ml-2 text-amber-600 hover:text-amber-800"
            >
              <FaInfoCircle className="inline" />
              <span className="sr-only">Information</span>
            </button>
          </label>
        </Tooltip>

        <input
          type="number"
          min="0"
          value={formData.numberOfBooksDistributed}
          onChange={(e) =>
            setFormData({
              ...formData,
              numberOfBooksDistributed: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Number of books"
          required
        />
      </div>

      {/* Krishna Katha Points */}
      <div className="relative">
        <Tooltip content="20 minutes of Krishna Katha = 1 KKP">
          <label className="block text-amber-900 font-medium mb-1">
            Krishna Katha Points (KKP)
            <button
              type="button"
              className="ml-2 text-amber-600 hover:text-amber-800"
            >
              <FaInfoCircle className="inline" />
              <span className="sr-only">Information</span>
            </button>
          </label>
        </Tooltip>

        <input
          type="number"
          min="0"
          step="0.5"
          value={formData.krishnaKathaPoints}
          onChange={(e) =>
            setFormData({ ...formData, krishnaKathaPoints: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter KKP points"
          required
        />
      </div>

      {/* Sankirtan */}
      <div className="relative">
        <Tooltip content="Enter the number of people you engaged in sankirtan">
          <label className="block text-amber-900 font-medium mb-1">
            Sankirtan
            <button
              type="button"
              className="ml-2 text-amber-600 hover:text-amber-800"
            >
              <FaInfoCircle className="inline" />
              <span className="sr-only">Information</span>
            </button>
          </label>
        </Tooltip>

        <input
          type="number"
          min="0"
          value={formData.sankirtanPoints}
          onChange={(e) =>
            setFormData({ ...formData, sankirtanPoints: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Number of people"
          required
        />
      </div>

      {/* Gaur Nitai Pleasure Points */}
      <div className="relative">
        <div className="flex">
          <Tooltip content="How many people you made chant today">
            <label className="block text-amber-900 font-medium mb-1">
              Gaur Nitai Pleasure Points
              <button
                type="button"
                className="ml-2 text-amber-600 hover:text-amber-800"
              >
                <FaInfoCircle className="inline" />
                <span className="sr-only">Information</span>
              </button>
            </label>
          </Tooltip>
        </div>

        <input
          type="number"
          min="0"
          value={formData.gaurNitaiPleasingPoints}
          onChange={(e) =>
            setFormData({
              ...formData,
              gaurNitaiPleasingPoints: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Number of people"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center ${
            loading
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </button>
      </div>
    </form>
  );
});

SankirtanForm.displayName = "SankirtanForm";

export default SankirtanForm;