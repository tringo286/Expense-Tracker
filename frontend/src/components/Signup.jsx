import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const Signup = () => {  
  const {
    fullName,
    setFullName,     
    email, 
    setEmail, 
    emailError,      
    password, 
    setPassword, 
    passwordError, 
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    setConfirmPasswordError,
    handleSignupSubmit  
  } = useAuth();  
  
  return (
   <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-gray-800 font-semibold text-center">Sign Up</h2>
      <form onSubmit={handleSignupSubmit}>
        <div className="mb-5">
          <label htmlFor="fullName" className="block mb-1">Full Name</label>
          <input 
            type="text" 
            name='fullName'
            id='fullName'
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="JohnDoe@gmail.com"
          />            
          {emailError && 
          <div 
            className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mt-2">
            {emailError}
          </div>}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Example123"
          />
          {passwordError && 
          <div 
            className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mt-2">
            {passwordError}
          </div>}
        </div>
        {/* <div className="mb-5">
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Example123"
            />
        </div> */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 rounded-md py-2 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            Sign Up
        </button>
        <p className="text-center">Already have an account?         
          <Link to="/login" className="text-blue-500 hover:text-blue-700 ml-2">Log In</Link>
        </p>
      </form>
    </div>
   </div>
  );
}

export default Signup
