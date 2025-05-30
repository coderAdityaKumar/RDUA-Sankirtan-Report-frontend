import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../sections/Header";

import balaramRDUA from "../assets/Balarama R.D.U.A..jpg";
import bodhyantahParasparamRDUA from "../assets/Bodhayantah parasparam R.D.U.A..jpg";
import gaurangaRDUA from "../assets/Gauranga R.D.U.A..jpg";
import nityanandaRDUA from "../assets/Nityananda R.D.U.A..jpg";
import prabhupadaRDUA from "../assets/Prabhupada R.D.U.A..jpg";
import RDUAKathamritam from "../assets/R.D.U.A. Kathamritam.jpg";
import SankirtanForm from "../sections/Form";
import FloatingAdminButton from "../Components/AdminButton";
import Footer from "../sections/Footer";
import FloatingHistoryButton from "../Components/HistoryButton";
import { FaBook, FaMedal, FaSyncAlt, FaPlusCircle } from "react-icons/fa";
// import { GiDivineGate } from "react-icons/gi";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import LiveButton from "../Components/LiveButton";

// Set app element for accessibility
Modal.setAppElement("#root");



// Group logo mapping
const GROUP_LOGOS = {
  "Nityananda R.D.U.A.": nityanandaRDUA,
  "Prabhupada R.D.U.A.": prabhupadaRDUA,
  "R.D.U.A. Kathamritam": RDUAKathamritam,
  "Bodhayantah parasparam R.D.U.A.": bodhyantahParasparamRDUA,
  "Balarama R.D.U.A.": balaramRDUA,
  "Gauranga R.D.U.A.": gaurangaRDUA,
};

const RDUA_GROUPS = Object.keys(GROUP_LOGOS);

function Home() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [role, setRole] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${baseURL}/auth/get-user-role`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        });
        setRole(response.data.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserRole();
  }, []);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/report/groups`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });

      // Create a map of groups with data
      const groupsWithData = response.data.reduce((acc, item) => {
        acc[item.groupName] = {
          ...item,
          totalPoints:
            (item.totalNumberOfBooksDistributed || 0) +
            (item.totalKrishnaKathaPoints || 0) +
            (item.totalSankirtanPoints || 0) +
            (item.totalGaurNitaiPleasingPoints || 0),
        };
        return acc;
      }, {});

      // Merge with all groups, filling zeros where no data exists
      const completeData = RDUA_GROUPS.map((groupName) => {
        return (
          groupsWithData[groupName] || {
            groupName,
            totalNumberOfBooksDistributed: 0,
            totalKrishnaKathaPoints: 0,
            totalSankirtanPoints: 0,
            totalGaurNitaiPleasingPoints: 0,
            totalPoints: 0,
          }
        );
      });

      // Sort by total points (groups with 0 points remain at bottom)
      const sortedData = [...completeData].sort((a, b) => {
        if (a.totalPoints === 0 && b.totalPoints === 0) return 0;
        if (a.totalPoints === 0) return 1;
        if (b.totalPoints === 0) return -1;
        return b.totalPoints - a.totalPoints;
      });

      setDashboardData(sortedData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFormSuccess = () => {
    closeModal();
    fetchDashboardData();
  };

  
    return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />

      <main className="flex-grow px-4 py-6">
        {/* Dashboard Header */}
        <div className="max-w-6xl mx-auto text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              <LiveButton />
              <h1 className="text-xl md:text-3xl font-bold text-amber-800 font-serif">
                Sankirtan Dashboard
              </h1>
            </div>
          </div>
        </div>

        {/* Live Dashboard */}
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 mb-8">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-4 px-6 relative flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FaMedal className="mr-2" />
              Group Rankings
            </h2>
          </div>

          {/* Dashboard Content */}
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="animate-spin h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full mx-auto" />
              <p className="text-amber-800 mt-4">Loading dashboard...</p>
            </div>
          ) : dashboardData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-100">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                      
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                      <FaBook className="inline mr-1" /> Books
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                      KKP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                      Sankirtan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                      Gaur Nitai PP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                      Total Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-100">
                  {dashboardData.map((group, index) => (
                    <tr
                      key={group.groupName}
                      className={`hover:bg-amber-50 transition-colors ${
                        group.totalPoints === 0 ? "opacity-70" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {group.totalPoints > 0 ? (
                          <div className="flex items-center">
                            
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm">
                              <img
                                src={GROUP_LOGOS[group.groupName]}
                                alt={group.groupName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 opacity-50">
                            <img
                              src={GROUP_LOGOS[group.groupName]}
                              alt={group.groupName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
                        {group.groupName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {group.totalNumberOfBooksDistributed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {group.totalKrishnaKathaPoints}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {group.totalSankirtanPoints}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                        {group.totalGaurNitaiPleasingPoints}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-amber-800">
                        {group.totalPoints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-amber-600">
              No data available. Please try refreshing.
            </div>
          )}
        </div>
        
        {/* Dashboard Controls */}
        <div className="max-w-6xl mx-auto flex justify-between mb-6">
          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all"
          >
            <FaSyncAlt className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Refreshing..." : "Refresh Data"}
          </button>

          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all"
          >
            <FaPlusCircle className="mr-2" />
            New Entry
          </button>
        </div>
      </main>

      {/* Modal for Sankirtan Form */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New Sankirtan Entry"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md mx-auto p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-800">New Entry</h2>
            <button
              onClick={closeModal}
              className="text-amber-600 hover:text-amber-800 text-2xl"
            >
              &times;
            </button>
          </div>
          <SankirtanForm onSuccess={handleFormSuccess} />
        </div>
      </Modal>

      <FloatingHistoryButton />
      {role === "admin" && <FloatingAdminButton />}
      <Footer />
    </div>
  );
}

export default Home;
