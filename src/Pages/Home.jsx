import React from "react";
import Header from "../sections/Header";
import SankirtanForm from "../sections/Form";
import Footer from "../sections/Footer";
import FloatingHistoryButton from "../Components/HistoryButton";

function Home() {
  return (
    <>
      <Header />
      <SankirtanForm />
      <FloatingHistoryButton/>
      <Footer/>
    </>
  );
}

export default Home;
