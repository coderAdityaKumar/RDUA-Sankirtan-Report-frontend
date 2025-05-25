import { FaInfoCircle } from 'react-icons/fa';
import logo from "../assets/logo.png"

const Header = () => (
  <header className="bg-amber-50 py-6 px-4 shadow-md">
    <div className="max-w-6xl flex flex-col md:flex-row items-center">
      <div className="flex items-center mb-4 md:mb-0">
        <img 
          src={logo} 
          alt="Srila Prabhupada" 
          className="h-20 w-20 rounded-full border-4 border-amber-500 object-contain "
        />
        <div className="ml-4">
          <h1 className="text-4xl font-bold text-amber-800 font-serif">
            <span className="block">R.D.U.A</span>
            <span className="text-xl text-amber-600">Sankirtan Report</span>
          </h1>
        </div>
      </div>
      <div className="md:ml-8 text-center md:text-left">
        <div className="text-amber-900 font-medium">
          <p className="text-lg">Read • Discuss • Understand • Apply</p>
          <p className="text-sm mt-1">Spreading the Holy Names Worldwide</p>
        </div>
      </div>
    </div>
  </header>
);
export default Header;