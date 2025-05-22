import { FaHistory } from "react-icons/fa";

const FloatingHistoryButton = ({ onClick }) => {
  return (
    <>
    <a href="/history">
      <button
        onClick={onClick}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-amber-600 text-white font-semibold rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out sm:px-5 sm:py-3 sm:text-base text-sm"
      >
        <FaHistory />
        <span className=" sm:inline">View History</span>
      </button>
      </a>
    </>
  );
};

export default FloatingHistoryButton;
