import { useNavigate} from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import useAuth from '../hooks/useAuth'

const Header = () => {
    const navigate = useNavigate();
    const logout = useLogout();   
    const { auth } = useAuth();

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
    <header className="flex justify-around items-center">
      <h1>ExpenseTracker</h1>
      <div>Welcome, <span className='text-blue-500'>{user}</span> !</div>
      <div className='p-3 bg-blue-500 rounded-lg text-white'>
          <button onClick={signOut}>Log Out</button>
      </div> 
    </header>
  )
}

export default Header
