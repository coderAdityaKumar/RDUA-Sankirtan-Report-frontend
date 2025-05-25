import { MdAdminPanelSettings } from "react-icons/md";


const FloatingAdminButton = ({ onClick }) => {
  return (
    <>
    <a href="/admin">
      <button
        onClick={onClick}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-3 bg-amber-600 text-white font-semibold rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out sm:px-5 sm:py-3 sm:text-base text-sm"
      >
        <MdAdminPanelSettings />
        <span className=" sm:inline">Admin Panel</span>
      </button>
      </a>
    </>
  );
};

export default FloatingAdminButton;