import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full h-24 sm:h-20 bg-white mb-5">
      <div className="flex justify-between items-center h-full">

        <Link to='/' className="flex items-center gap-2 ml-10">
          <img 
              src="/logo.png" 
              alt="logo" 
              className="object-fit h-12 sm:h-14"
          />
          <h1 className="text-indigo-600 font-bold text-lg sm:text-2xl">Expense Tracker</h1>
        </Link> 

        <div className="hidden sm:flex sm:gap-5 sm:mr-30 sm:w-96 sm:justify-center">
          <Link 
            to="/dashboard" 
            className="px-4 bg-indigo-600 rounded-md py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 block text-center"
          >
            Dash Board
          </Link>
          <Link 
            to="/login" 
            className="w-20 bg-indigo-600 rounded-md py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 block text-center"
          >
            Log In
          </Link>

          <Link 
            to="/signup" 
            className="w-20 bg-indigo-600 rounded-md py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 block text-center"
          >
            Sign Up
          </Link>          
          </div>
          {/* Hamburger menu for md screens */}
          <button 
            className="sm:hidden p-2 text-indigo-600 focus:outline-none mr-10 text-4xl"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "X" : "☰"}
          </button>

          {isMenuOpen && (
          <div className="absolute top-20 right-5 bg-white shadow-md p-4 w-48 rounded-md md:hidden">
            <Link 
              to="/dashboard" 
              className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
            >
              Dash Board
            </Link>
            <Link 
              to="/login" 
              className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>   
  )
};

export default Header;
