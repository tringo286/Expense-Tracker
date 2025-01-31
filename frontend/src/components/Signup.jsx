import { Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const Signup = () => {  
  const {
    fullName,
    setFullName,     
    email, 
    setEmail, 
    emailError,      
    password, 
    setPassword, 
    showPassword,
    passwordError, 
    confirmPassword,
    setConfirmPassword,
    showConfirmPassword,
    confirmPasswordError,    
    handleSignupSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useAuth();  

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); 
  }

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
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={handleGoBack} 
              className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100"
              aria-label="Go Back"
            >
              <FaArrowLeft size={20} />
            </button>
            <div></div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-indigo-600">Sign Up</h2>
          <p className="text-gray-500 mb-8">to continue to Expense Tracker</p>
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-5 w-80">
              <label htmlFor="fullName"></label>
              <input 
                type="text" 
                name='fullName'
                id='fullName'
                className="border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-5">
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
            <div className="mb-5 relative">
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
            <div className="mb-5 relative">
              <label htmlFor="confirmPassword"></label>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  className="border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                  placeholder="Confirm your password  "
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                  role="button"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {confirmPasswordError && 
                  <div 
                    className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mt-2">
                    {confirmPasswordError}
                  </div>}
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-500 rounded-md py-2 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              >
                Sign Up
            </button>
            <p className="text-center">Already have an account?         
              <Link to="/login" className="text-indigo-500 hover:text-indigo-700 ml-2">Log In</Link>
            </p>
          </form>
        </div>
      </div>          
    </section>
  );
}

export default Signup
