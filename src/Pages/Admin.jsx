import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../sections/Header";
import dayjs from "dayjs";
import Footer from "../sections/Footer";
import { FaSearch, FaCalendarAlt, FaBook } from "react-icons/fa";

const AdminDashboard = () => {
  const groups = [
    "All Groups",
    "Nityananda R.D.U.A.",
    "Prabhupada R.D.U.A.",
    "R.D.U.A. Kathamritam",
    "Bodhayantah parasparam R.D.U.A.",
    "Balarama R.D.U.A.",
    "Gauranga R.D.U.A.",
  ];

  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setMinDate(thirtyDaysAgo.toISOString().split("T")[0]);
    setMaxDate(today.toISOString().split("T")[0]);
  }, []);

  const handleSearch = async () => {
    if (!minDate || !maxDate) return;
    setIsLoading(true);
    try {
      const adjustedMinDate = dayjs(minDate)
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      const adjustedMaxDate = dayjs(maxDate).add(1, "day").format("YYYY-MM-DD");
      let response;
      console.log(adjustedMaxDate, adjustedMinDate);
      if (selectedGroup === "All Groups") {
        response = await axios.post(
          `${baseURL}/admin/all-groups`,
          { minDate: adjustedMinDate, maxDate: adjustedMaxDate },
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(
          `${baseURL}/admin/admin/group-by-name`,
          {
            groupName: selectedGroup,
            minDate: adjustedMinDate,
            maxDate: adjustedMaxDate,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Handle both object and array response
      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      console.log(response.data);
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totals = reports.reduce(
    (acc, report) => {
      return {
        books: acc.books + (report.totalNumberOfBooksDistributed || 0),
        kkp: acc.kkp + (report.totalKrishnaKathaPoints || 0),
        sankirtan: acc.sankirtan + (report.totalSankirtanPoints || 0),
        pleasurePoints:
          acc.pleasurePoints + (report.totalGaurNitaiPleasingPoints || 0),
      };
    },
    { books: 0, kkp: 0, sankirtan: 0, pleasurePoints: 0 }
  );

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header onHistoryClick={() => {}} />
      <main className="flex-grow max-w-6xl mx-auto py-8 px-4 w-full">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-amber-800 font-serif">
            Admin Dashboard
          </h2>
          <p className="text-amber-600 mt-2">
            Manage and analyze sankirtan reports
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200 mb-10">
          <div className="bg-amber-600 py-3 px-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FaSearch className="mr-2" /> Search Reports
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">
                Group
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-amber-300"
              >
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={minDate}
                  onChange={(e) => setMinDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-amber-300"
                />
                <FaCalendarAlt className="absolute right-3 top-3 text-amber-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-1">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={maxDate}
                  min={minDate}
                  onChange={(e) => setMaxDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-amber-300"
                />
                <FaCalendarAlt className="absolute right-3 top-3 text-amber-500" />
              </div>
            </div>
          </div>
          <div className="bg-amber-50 px-6 py-3 flex justify-end">
            <button
              onClick={handleSearch}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200 mb-10">
          <div className="bg-amber-600 py-3 px-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FaBook className="mr-2" />
              {selectedGroup === "All Groups"
                ? "All Groups"
                : selectedGroup}{" "}
              Reports
              <span className="ml-auto text-amber-100 text-sm">
                {minDate} to {maxDate}
              </span>
            </h3>
          </div>

          {isLoading ? (
            <div className="p-10 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
              <p className="text-amber-800 mt-4">Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-amber-800">
                No reports found for selected criteria
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-amber-200">
                  <thead className="bg-amber-50">
                    <tr>
                      {selectedGroup === "All Groups" && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-amber-800">
                          Group
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800">
                        Books
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800">
                        KKP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800">
                        Sankirtan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800">
                        Pleasure Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-amber-200">
                    {reports.map((report, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-amber-50"}
                      >
                        {selectedGroup === "All Groups" && (
                          <td className="px-6 py-4 text-sm text-amber-900">
                            {report.groupName}
                          </td>
                        )}
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
                  <tfoot className="bg-amber-100 font-semibold">
                    <tr>
                      {selectedGroup === "All Groups" && (
                        <td className="px-6 py-4 text-sm text-amber-900">
                          Total
                        </td>
                      )}
                      <td className="px-6 py-4 text-sm text-amber-900">
                        {totals.books}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900">
                        {totals.kkp}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900">
                        {totals.sankirtan}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900">
                        {totals.pleasurePoints}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="bg-amber-50 px-6 py-3 text-sm text-amber-700">
                Showing {reports.length} report{reports.length > 1 ? "s" : ""}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
