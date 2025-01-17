import { Link, useNavigate, useLocation} from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { FaChartLine } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import useRandomAvatar from '../hooks/useRandomAvatar';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();           

    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email
    const avatar = useRandomAvatar(email); 

    const isDashBoard = location.pathname === "/";

    const signOut = async () => {
        await logout();
        localStorage.removeItem('user');
        navigate('/login');
    }    

    return (
      <header className="flex flex-col justify-between p-4 bg-white rounded-3xl my-5">
        <div className='flex flex-col justify-around h-2/5 w-48'>
          <div className='flex items-center gap-5'>
            <img src={avatar} alt="User Avatar" className='w-14'/>
            <div className='text-xl font-bold text-indigo-500'>              
              {user.email}
            </div>
          </div>
          <div className='flex flex-col justify-center gap-4'>
            <div className='flex items-center gap-3 w-full'>
              <div className={`${isDashBoard ? "w-1 h-5 bg-indigo-500" : ""}`}></div>               
              <div className={`${isDashBoard ? "text-xl" : ""}`}><FaChartLine /></div>
              <Link to='/' className={`${isDashBoard ? "text-xl" : ""}`}>Dashboard</Link>  
            </div>       
            <div className='flex items-center gap-3 w-full '>
              <FaCreditCard />
              <Link to="/transactions">View Transactions</Link>         
            </div>
            <div className='flex items-center gap-3 w-full '>
              <FaMoneyBillTrendUp/>
              <Link to="/incomes">Incomes</Link>         
            </div>
            <div className='flex items-center gap-3 w-full '>
              <FaMoneyBillTransfer />
              <Link to="/expenses">Expenses</Link>         
            </div>
          </div>
        </div>
        <div className='flex justify-start items-center gap-3'>
            <MdLogout />
            <button onClick={signOut}>Log Out</button>
        </div> 
      </header>
    )
}

export default Header
