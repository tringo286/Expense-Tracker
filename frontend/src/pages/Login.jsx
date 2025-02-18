import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import GoBackButton from "../components/Buttons/GoBackButton";
import AuthInputField from "../components/InputFields/AuthInputField";
import FormButton from "../components/Buttons/FormButton";
import AuthBackgroundSection from "../components/AuthBackGroundSecton";

const Login = () => {
  const {  
    setAuth,    
    email, 
    setEmail, 
    emailError,  
    setEmailError,    
    password, 
    setPassword,
    showPassword,    
    passwordError,  
    setPasswordError,        
    handleGoBack,   
    togglePasswordVisibility,       
  } = useAuth();    

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";  

  const handleLoginSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const res = await axios.post('/login', {
          email,
          password
        }, {  
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true 
        });      
        
        const data = res.data;              
        
        if(data.user) {        
          setAuth({ user: data.user });
          localStorage.setItem('user', JSON.stringify(data.user));            
          return navigate(from, { replace: true });
        }         
      
      } catch (error) { 
        console.error("An error occurred during login:");
    
        if (error.response) {
          console.log("Error response data:", error.response.data);         
          setEmailError(error.response.data.errors.email);
          setPasswordError(error.response.data.errors.password);
        }       
      }
  };

  return (
    <section className="h-screen w-screen grid grid-cols-12 grid-rows-12">
      <AuthBackgroundSection bgImage="/auth-bg.avif" title="Welcome to Expense Tracker" description="Monitor your expenses, set budgets, and gain insights into your financial habits. Stay on top of your finances with ease and take control of your future."/>
      <div className="col-span-full row-span-9 lg:col-span-6 lg:row-span-full flex justify-center items-center bg-gray-50">
        <div className="bg-white p-10 sm:p-12 border-none rounded-xl shadow-xl">     
          <GoBackButton onGoBack={handleGoBack}/>     
          <h2 className="text-2xl font-bold mb-2 text-indigo-600">Log In</h2>
          <p className="text-gray-500 mb-8">to continue to Expense Tracker</p>
          <form onSubmit={handleLoginSubmit} className="w-64 sm:w-80">
            <label htmlFor="email"></label>              
            <AuthInputField
              type="email"
              name="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={emailError}
            />

            <label htmlFor="password"></label>              
            <AuthInputField
              type={showPassword ? "text" : "password"}
              name="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={passwordError}
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              toggleVisibility={togglePasswordVisibility}
            /> 
           
            <FormButton text="Log In"/>
            <p className="text-center text-gray-500">Don't have an account?        
              <Link to="/signup" className="text-indigo-500 hover:text-indigo-700 ml-2">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
  
  export default Login;
  