import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from "../sections/Header";
import SankirtanForm from "../sections/Form";
import FloatingAdminButton from "../Components/AdminButton";
import Footer from "../sections/Footer";
import FloatingHistoryButton from "../Components/HistoryButton";
import { useState } from "react";

function Home() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [role,setRole]=useState("");
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
        // console.log(response)
        const role = response.data.data.role;
        console.log(role)
        setRole(response.data.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserRole();
    }, []);
  return (
    <>
      <Header />
      <SankirtanForm />
      <FloatingHistoryButton/>
      {role === "admin" && <FloatingAdminButton />}
      <Footer/>
    </>
  );
}

export default Home;
