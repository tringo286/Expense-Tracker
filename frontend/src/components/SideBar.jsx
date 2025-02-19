import { useNavigate, useLocation} from 'react-router-dom'  
import { MdLogout } from "react-icons/md";
import useRandomAvatar from '../hooks/useRandomAvatar';
import useLogout from '../hooks/useLogout'
import NavLinks from './NavLinks'
import { useState } from "react";
import { Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout(); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);          

    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email;
    const avatar = useRandomAvatar(email); 
    const isAdmin = user && user.role === 'admin';
    const userRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);

    const isDashBoardPage = location.pathname === "/dashboard";    
    const isIncomePage = location.pathname === "/incomes";
    const isExpensePage = location.pathname === "/expenses";
    const isAdminPage = location.pathname === "/admin";

    const signOut = async () => {
        await logout();         
        navigate('/');
    };    
    
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <header className="col-span-full row-span-2 lg:col-span-3 lg:row-span-full p-4 lg:p-10">
        <div className='flex justify-between lg:justify-start lg:grid ld:grid-rows-12 bg-white h-full px-8 sm:px-20 sm:py-3 lg:p-6 border rounded-3xl'>
          <div className='lg:row-span-2 flex flex-row items-center gap-4 lg:mb-4'>
            <img src={avatar} alt="User Avatar" className='w-14'/>            
            <div>
              <p className='text-2xl text-indigo-500 font-semibold'>{user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}              
              </p>
              {isAdmin && (
                <p className='text-sm text-gray-700'>{userRole}</p>
              )}
            </div>
          </div>
          <div className='hidden lg:flex lg:flex-col lg:justify-between lg:row-span-10'>
            <NavLinks 
              isDashBoardPage={isDashBoardPage} 
              isIncomePage={isIncomePage} 
              isExpensePage={isExpensePage} 
              isAdminPage={isAdminPage} 
              isAdmin={isAdmin} 
            />
            <div className='flex justify-start items-center gap-3 hover:text-indigo-700'>
                <MdLogout />
                <button onClick={signOut}>Log Out</button>
            </div>  
            
             
          </div> 

          <button 
            className="relative lg:hidden p-2 text-indigo-600 focus:outline-none text-4xl"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "X" : "☰"}
          </button>
          
          {isMenuOpen && (
            <div className="absolute top-24 right-24 bg-white border border-indigo-200 shadow-md p-4 w-48 rounded-md lg:hidden">
              <Link 
                to="/dashboard" 
                className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
              >
                Dash Board
              </Link>
              <Link 
                to="/expenses" 
                className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
              >
                Expenses
              </Link>
              <Link 
                to="/incomes" 
                className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
              >
                Incomes
              </Link>
              {isAdmin && (
                <Link 
                to="/admin" 
                className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
              >
                Admin
              </Link>
              )}
              <button className='block px-4 py-2 text-indigo-600 hover:bg-indigo-100' onClick={signOut}>Log out</button>
            </div>
          )}
        </div>        
      </header>
    )
};

export default Header;