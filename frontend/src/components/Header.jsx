import { Link, useNavigate, useLocation} from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { FaChartLine } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import useRandomAvatar from '../hooks/useRandomAvatar';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();           

    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email
    const avatar = useRandomAvatar(email); 
    const isAdmin = user && user.role === 'admin';
    const userRole = user.role.charAt(0).toUpperCase() + user.role.slice(1)

    const isDashBoardPage = location.pathname === "/";    
    const isIncomePage = location.pathname === "/incomes";
    const isExpensePage = location.pathname === "/expenses";
    const isAdminPage = location.pathname === "/admin";

    const signOut = async () => {
        await logout();        
        navigate('/login');
    }     

    return (
      <header className="col-span-3 p-10">
        <div className='grid grid-rows-12 bg-white h-full p-6 border rounded-3xl'>
          <div className='row-span-2 flex flex-row items-center gap-4 mb-4'>
            <img src={avatar} alt="User Avatar" className='w-14'/>            
            <div>
              <p className='text-2xl text-indigo-500 font-semibold'>{user.fullName}</p>
              {isAdmin && (
                <p className='text-sm text-gray-700'>{userRole}</p>
              )}
            </div>
          </div>
          <div className='row-span-9 flex flex-col gap-6'>
            <Link to='/' className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isDashBoardPage ? 'text-lg font-bold text-indigo-500' : ''}`}><FaChartLine />Dashboard</Link>           
            <Link to='/incomes' className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isIncomePage ? 'text-lg font-bold text-indigo-500' : ''}`}><FaMoneyBillTrendUp />Incomes</Link>  
            <Link to='/expenses' className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isExpensePage ? 'text-lg font-bold text-indigo-500' : ''}`}><FaMoneyBillTransfer />Expenses</Link>   
            {isAdmin && (
              <Link to='/admin' className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isAdminPage ? 'text-lg font-bold text-indigo-500' : ''}`}>
                  <RiAdminFill />Admin
              </Link>
            )}
          </div>
          <div className='row-span-1 flex justify-start items-center gap-3 hover:text-indigo-700'>
              <MdLogout />
              <button onClick={signOut}>Log Out</button>
          </div>  
        </div>        
      </header>
    )
}

export default Header
