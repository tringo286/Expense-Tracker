import { Link } from "react-router-dom";
import useRefreshToken from '../hooks/useRefreshToken';

const LinkPage = () => {
    const refresh = useRefreshToken();
  return (
    <section className="flex flex-col items-center justify-center text-center p-8 space-y-6">
    <h1 className="text-4xl font-bold">Links</h1>

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
            <Link to="/" className="text-blue-500 hover:underline cursor-pointer text-xl block">Home</Link>
            <Link to="/editor" className="text-blue-500 hover:underline cursor-pointer text-xl block">Editors Page</Link>
            <Link to="/admin" className="text-blue-500 hover:underline cursor-pointer text-xl block">Admin Page</Link>
        </div>
    </div>
    <button onClick={() => refresh()}>Refresh</button>
</section>

  )
}

export default LinkPage
