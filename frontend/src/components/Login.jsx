import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {      
    email, 
    setEmail, 
    emailError,      
    password, 
    setPassword,
    showPassword,    
    passwordError,     
    handleLoginSubmit,
    togglePasswordVisibility
  } = useAuth();    
  
  return (
    <section className="h-screen w-screen grid grid-cols-12">
      <div className="relative col-span-6">
        <img src="/auth-bg.avif" alt="Login Background" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-black opacity-20"></div> {/* Dark overlay */}        
        <div className="absolute w-full h-full flex justify-center items-end">
            <div className="text-white p-12 space-y-5">
              <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
              <p className="text-lg">Monitor your expenses, set budgets, and gain insights into your financial habits. Stay on top of your finances with ease and take control of your future.</p>
            </div>
        </div>
      </div>
      <div className="col-span-6 flex justify-center items-center bg-gray-50">
        <div className="bg-white p-12 border-none rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-2 text-indigo-600">Log In</h2>
          <p className="text-gray-500 mb-8">to continue to Expense Tracker</p>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-5 w-80">
              <label htmlFor="email"></label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
              {emailError && 
              <div 
                className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mt-2">
                {emailError}
              </div>}
            </div>
            <div className="mb-10 relative">
              <label htmlFor="password"></label>
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                id="password" 
                className="border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span> 
              {passwordError && 
              <div 
                className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mt-2">
                {passwordError}
              </div>}
            </div>
            <button type="submit" className="w-full bg-indigo-500 rounded-md py-2 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4">Log In</button>
            <p className="text-center text-gray-500">Don't have an account?        
              <Link to="/signup" className="text-indigo-500 hover:text-indigo-700 ml-2">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
  
  export default Login
  