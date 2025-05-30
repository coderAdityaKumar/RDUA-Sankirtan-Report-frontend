import { FaInfoCircle } from 'react-icons/fa';
import logo from "../assets/logo.png"

const Header = () => (
  <header className="bg-gradient-to-r from-amber-50 to-amber-100 py-4 px-4 shadow-lg">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
      <div className="flex items-center group w-full sm:w-auto justify-center sm:justify-start">
        <div className="relative shrink-0">
          <img 
            src={logo} 
            alt="Srila Prabhupada" 
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-[3px] border-amber-400 object-cover shadow-md"
          />
          
        </div>
        <div className="ml-3 sm:ml-4">
          <h1 className="text-xl sm:text-2xl font-bold text-amber-900 font-sans tracking-tight">
            <span className="block bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">R.D.U.A</span>
            <span className="text-sm sm:text-base font-medium text-amber-600 sm:mt-1 inline-block border-b border-amber-400 pb-0.5">
              Sankirtan Report
            </span>
          </h1>
        </div>
      </div>

      <div className="text-center sm:text-right w-full sm:w-auto">
        <p className="text-sm sm:text-base font-medium text-amber-800 mb-1 sm:mb-2 leading-tight">
          Read • Discuss • Understand • Apply
        </p>
        <p className="text-xs text-amber-700 max-w-md leading-snug sm:leading-relaxed">
          Dedicated to His Divine Grace A.C. Bhaktivedānta Swami Prabhupāda, 
          Founder Ācārya of ISKCON
        </p>
      </div>
    </div>
  </header>
);

export default Header;