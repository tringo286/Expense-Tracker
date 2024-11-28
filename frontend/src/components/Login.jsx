

const Login = ({ onSwitch }) => {
    return (
     <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-gray-800 font-semibold text-center">Log In</h2>
        <form>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 rounded-md py-2 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">Log In</button>
          <p className="text-center">Don't have an account?             
            <button className="text-blue-500 hover:text-blue-700 ml-2" onClick={() => onSwitch('signup')}>Sign Up</button>
          </p>
        </form>
      </div>
     </div>
    );
  }
  
  export default Login
  