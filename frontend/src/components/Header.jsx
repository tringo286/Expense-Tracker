import { Link, useNavigate} from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import useAuth from '../hooks/useAuth'
import { FaChartLine } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import useRandomAvatar from '../hooks/useRandomAvatar';

const Header = () => {
    const navigate = useNavigate();
    const logout = useLogout();   
    const { auth } = useAuth();
    const avatar = useRandomAvatar();

    if (auth.user) {
      localStorage.setItem('user', auth.user);  
    }
      
    const user = localStorage.getItem('user');
    
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
              {user.slice(0,3).charAt(0).toUpperCase() + user.slice(1,3)}
            </div>
          </div>
          <div className='flex flex-col justify-center gap-4'>
            <div className='flex items-center gap-3 w-full '>
              <FaChartLine />
              <h1><Link to='/'>Dashboard</Link></h1>   
            </div>       
            <div className='flex items-center gap-3 w-full '>
              <FaCreditCard />
              <Link to="/transactions" className=''>View Transactions</Link>         
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
