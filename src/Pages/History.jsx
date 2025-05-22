import { useState, useEffect } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import {
  FaSearch,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaPrayingHands,
} from "react-icons/fa";

const HistoryPage = () => {
  const groups = [
    "Nityānanda R.D.U.A.",
    "Prabhupāda R.D.U.A.",
    "R.D.U.A. Kathāmritam",
    "B𝙤𝙙𝙝𝙖𝙮𝙖𝙣𝙩𝙖𝙝 𝙥𝙖𝙧𝙖𝙨𝙥𝙖𝙧𝙖𝙢 R.D.U.A.",
    "Balarāma R.D.U.A.",
    "Gauraṅga R.D.U.A.",
  ];

  
  const ekadashiPeriods = [
    {
      name: "Kamada Ekadashi to Varuthini Ekadashi",
      start: "2023-03-27",
      end: "2023-04-08",
    },
    {
      name: "Varuthini Ekadashi to Mohini Ekadashi",
      start: "2023-04-09",
      end: "2023-04-24",
    },
    {
      name: "Mohini Ekadashi to Apara Ekadashi",
      start: "2023-04-25",
      end: "2023-05-08",
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch reports when group or period changes
  useEffect(() => {
    if (selectedGroup && selectedPeriod) {
      fetchReports();
    }
  }, [selectedGroup, selectedPeriod]);

  const fetchReports = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // This would be replaced with actual API call
      // const response = await axios.get(`/api/reports?group=${selectedGroup}&start=${selectedPeriod.start}&end=${selectedPeriod.end}`);

      // Mock data
      const mockReports = [
        {
          date: "2023-04-05",
          books: 15,
          kkp: 4,
          sankirtan: 10,
          pleasurePoints: 7,
          devoteeName: "Gopal Dasa",
        },
        {
          date: "2023-04-03",
          books: 8,
          kkp: 2.5,
          sankirtan: 5,
          pleasurePoints: 3,
          devoteeName: "Radhika Dasi",
        },
        {
          date: "2023-04-01",
          books: 12,
          kkp: 3,
          sankirtan: 8,
          pleasurePoints: 6,
          devoteeName: "Krishna Das",
        },
      ];

      setReports(mockReports);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header onHistoryClick={() => {}} />

      <main className="flex-grow max-w-6xl mx-auto py-8 px-4 w-full">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-amber-800 font-serif">
            Ekadashi Sankirtan History
          </h2>
          <p className="text-amber-600 mt-2">
            View reports between sacred Ekadashi periods
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Group Selection */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200">
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
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
              >
                <option value="">Choose your group</option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ekadashi Period Selection */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200">
            <div className="bg-amber-600 py-3 px-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FaCalendarAlt className="mr-2" />
                Select Ekadashi Period
              </h3>
            </div>
            <div className="p-6">
              <select
                value={selectedPeriod}
                onChange={(e) =>
                  setSelectedPeriod(
                    ekadashiPeriods.find((p) => p.name === e.target.value) || ""
                  )
                }
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                disabled={!selectedGroup}
              >
                <option value="">Choose Ekadashi period</option>
                {ekadashiPeriods.map((period) => (
                  <option key={period.name} value={period.name}>
                    {period.name} ({period.start} to {period.end})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {selectedGroup && selectedPeriod && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-200 mb-10 transition-all duration-300">
            <div className="bg-amber-600 py-3 px-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FaBook className="mr-2" />
                {selectedGroup} - {selectedPeriod.name}
              </h3>
              <p className="text-amber-100 text-sm mt-1">
                {
                  ekadashiPeriods.find((p) => p.name === selectedPeriod.name)
                    ?.start
                }{" "}
                to{" "}
                {
                  ekadashiPeriods.find((p) => p.name === selectedPeriod.name)
                    ?.end
                }
              </p>
            </div>

            {isLoading ? (
              <div className="p-10 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
                <p className="text-amber-800 mt-4">Loading sacred reports...</p>
              </div>
            ) : reports.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-amber-800">
                  No reports found for this period
                </p>
                <p className="text-amber-600 mt-2">
                  Please try another Ekadashi period
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-amber-200">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Devotee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Books
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        KKP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                        Sankirtan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
                          {report.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                          {report.devoteeName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                          {report.books}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                          {report.kkp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                          {report.sankirtan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                          {report.pleasurePoints}
                        </td>
                      </tr>
                    ))}
                    {/* Totals Row */}
                    <tr className="bg-amber-100 font-semibold">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {reports.reduce((sum, report) => sum + report.books, 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {reports.reduce((sum, report) => sum + report.kkp, 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {reports.reduce(
                          (sum, report) => sum + report.sankirtan,
                          0
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {reports.reduce(
                          (sum, report) => sum + report.pleasurePoints,
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;
