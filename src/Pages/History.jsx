import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../sections/Header";
import toast from "react-hot-toast";
import Footer from "../sections/Footer";
import { FaUsers, FaBook } from "react-icons/fa";

const RDUA_GROUPS = [
  "Nityananda R.D.U.A.",
  "Prabhupada R.D.U.A.",
  "R.D.U.A. Kathamritam",
  "Bodhayantah parasparam R.D.U.A.",
  "Balarama R.D.U.A.",
  "Gauranga R.D.U.A.",
];

const HistoryPage = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [selectedGroup, setSelectedGroup] = useState("");
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedGroup !== "") {
      fetchReports();
    }
  }, [selectedGroup]);

  const fetchReports = async () => {
    setIsLoading(true);
    setError("");

    try {
      let response;
      if (selectedGroup === "ALL") {
        response = await axios.get(`${baseURL}/report/groups`, {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setReports(response.data);
      } else {
        response = await axios.post(
          `${baseURL}/report/get-group-report`,
          {
            groupName: selectedGroup,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setReports(response.data);
      }
    } catch (err) {
      console.log(err);
      console.error("Error Response:", err.response);
      const errorMessage =
        err.response?.data?.message || "Failed fetching report";
      toast.error(errorMessage);
      setError("Failed to fetch reports. Please try again.");
      setReports([]);
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header onHistoryClick={() => {}} />

      <main className="flex-grow max-w-4xl mx-auto py-8 px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-amber-800 font-serif">
            Ekadashi Sankirtan History
          </h2>
          <p className="text-amber-600 mt-2">
            View group-wise reports from the last Ekadashi
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-amber-200 mb-6">
          <div className="bg-amber-600 py-3 px-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FaUsers className="mr-2" />
              Select Group
            </h3>
          </div>
          <div className="p-6">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="">Choose your group</option>
              <option value="ALL">All Groups</option>
              {RDUA_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center mt-10">
            <div className="animate-spin h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto" />
            <p className="text-amber-800 mt-4">Loading reports...</p>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center mt-4">{error}</div>
        ) : reports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-amber-200 bg-white rounded-xl shadow-md">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-800">
                    Group
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-800">
                    Books
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-800">
                    KKP
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-800">
                    Sankirtan
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-amber-800">
                    Pleasure Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {reports.map((report, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-amber-50"}
                  >
                    <td className="px-6 py-4 text-sm text-amber-900">
                      {report.groupName}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-900">
                      {report.totalNumberOfBooksDistributed}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-900">
                      {report.totalKrishnaKathaPoints}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-900">
                      {report.totalSankirtanPoints}
                    </td>
                    <td className="px-6 py-4 text-sm text-amber-900">
                      {report.totalGaurNitaiPleasingPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : selectedGroup ? (
          <div className="text-center text-amber-600 mt-8">
            No reports found for the selected group.
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;
