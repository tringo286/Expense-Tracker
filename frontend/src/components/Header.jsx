import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-20 bg-white">
      <div className="flex justify-between items-center h-full">
          <Link to='/' className="flex items-center gap-2 ml-20">
            <img 
                src="/logo.png" 
                alt="logo" 
                className="object-fit h-14"
            />
            <h1 className="text-indigo-600 font-bold text-2xl">Expense Tracker</h1>
          </Link> 
        <div className="flex gap-5 mr-30 w-96 justify-center">
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
      </div>
    </header>   
  )
};

export default Header;
