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

    const isDashBoardPage = location.pathname === "/";
    const isTransactionPage = location.pathname === "/transactions";
    const isIncomePage = location.pathname === "/incomes";
    const isExpensePage = location.pathname === "/expenses";

    const signOut = async () => {
        await logout();        
        navigate('/login');
    }    

    return (
      <header className="flex flex-col justify-between p-4 bg-white rounded-3xl my-5">
        <div className='flex flex-col justify-around h-2/5 w-52'>
          <div className='flex items-center gap-5'>
            <img src={avatar} alt="User Avatar" className='w-14'/>
            <div className='text-xl font-bold text-indigo-500'>              
              {user.fullName}
            </div>
          </div>
          <div className='flex flex-col justify-center gap-4'>
            <div className='flex items-center gap-3 w-full'>                           
              <div className={`${isDashBoardPage ? "text-xl text-indigo-500" : ""}`}><FaChartLine /></div>
              <Link to='/' className={`${isDashBoardPage ? "text-xl font-bold text-indigo-500" : ""}`}>Dashboard</Link>  
            </div>       
            <div className='flex items-center gap-3 w-full'>                           
              <div className={`${isTransactionPage ? "text-xl text-indigo-500" : ""}`}><FaCreditCard /></div>
              <Link to='/transactions' className={`${isTransactionPage ? "text-xl font-bold text-indigo-500" : ""}`}>View Transactions</Link>  
            </div>  
            <div className='flex items-center gap-3 w-full'>                           
              <div className={`${isIncomePage ? "text-xl text-indigo-500" : ""}`}><FaMoneyBillTrendUp /></div>
              <Link to='/incomes' className={`${isIncomePage ? "text-xl font-bold text-indigo-500" : ""}`}>Incomes</Link>  
            </div>  
            <div className='flex items-center gap-3 w-full'>                           
              <div className={`${isExpensePage ? "text-xl text-indigo-500" : ""}`}><FaMoneyBillTransfer /></div>
              <Link to='/expenses' className={`${isExpensePage ? "text-xl font-bold text-indigo-500" : ""}`}>Expenses</Link>  
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
