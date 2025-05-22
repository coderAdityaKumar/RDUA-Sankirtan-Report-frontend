import Tooltip from "../Components/Tooltip";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
const SankirtanForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    date: today,
    group: "",
    books: "",
    kkp: "",
    sankirtan: "",
    pleasurePoints: "",
  });

  const groups = [
    "Nityānanda R.D.U.A.",
    "Prabhupāda R.D.U.A.",
    "R.D.U.A. Kathāmritam",
    "B𝙤𝙙𝙝𝙖𝙮𝙖𝙣𝙩𝙖𝙝 𝙥𝙖𝙧𝙖𝙨𝙥𝙖𝙧𝙖𝙢 R.D.U.A.",
    "Balarāma R.D.U.A.",
    "Gauraṅga R.D.U.A.",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-amber-200">
        <div className="bg-amber-600 py-3 px-6">
          <h2 className="text-xl font-bold text-white">
            Submit Your Sankirtan Report
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              value={formData.group}
              onChange={(e) =>
                setFormData({ ...formData, group: e.target.value })
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
              value={formData.books}
              onChange={(e) =>
                setFormData({ ...formData, books: e.target.value })
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
              value={formData.kkp}
              onChange={(e) =>
                setFormData({ ...formData, kkp: e.target.value })
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
              value={formData.sankirtan}
              onChange={(e) =>
                setFormData({ ...formData, sankirtan: e.target.value })
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
              value={formData.pleasurePoints}
              onChange={(e) =>
                setFormData({ ...formData, pleasurePoints: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Number of people"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default SankirtanForm;
