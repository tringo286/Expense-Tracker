import { Link, useNavigate} from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import useRefreshToken from "../hooks/useRefreshToken";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const refresh = useRefreshToken();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <section className="flex flex-col items-center justify-center text-center p-8 space-y-6">
            <h1 className="text-4xl font-bold">Home</h1>

            <div className="space-y-4">
                <h2 className="text-3xl font-semibold">Public</h2>
                <div className="space-y-4">  
                    <Link to="/login" className="text-blue-500 hover:underline cursor-pointer text-xl block">Login</Link>
                    <Link to="/signup" className="text-blue-500 hover:underline cursor-pointer text-xl block">Signup</Link>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-semibold">Private</h2>                
                <div className="space-y-4"> 
                    <Link to="/admin" className="text-blue-500 hover:underline cursor-pointer text-xl block">Admin</Link>         
                </div>
            </div> 
            <div>
                <button onClick={signOut}>Log Out</button>
            </div>            
        </section>
    )
}

export default Home
