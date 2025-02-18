import { Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoBackButton from "../components/Buttons/GoBackButton";
import AuthInputField from "../components/InputFields/AuthInputField";
import FormButton from "../components/Buttons/FormButton";
import AuthBackgroundSection from "../components/AuthBackGroundSecton";
import { useState } from "react";
import axios from '../api/axios';

const Signup = () => {  
  const {
    fullName,
    setFullName,     
    email, 
    setEmail, 
    emailError, 
    setEmailError,     
    password, 
    setPassword, 
    showPassword,
    passwordError,
    setPasswordError, 
    confirmPassword,
    setConfirmPassword,    
    confirmPasswordError,   
    setConfirmPasswordError,     
    togglePasswordVisibility,  
    handleGoBack,
  } = useAuth();    

  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };    

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('/signup', {
        fullName,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const data = res.data;        
  
      if (data.user) {                                                 
        return navigate('/login');
      }
  
    } catch (error) {
      console.error("An error occurred during signup:");
  
      if (error.response) {
        console.log("Error response data:", error.response.data);         
        setEmailError(error.response.data.errors?.email);
        setPasswordError(error.response.data.errors?.password);
      }       
    }
  };

  return (
    <section className="h-screen w-screen grid grid-cols-12 grid-rows-12">     
      <AuthBackgroundSection bgImage="/auth-bg.avif" title="Welcome to Expense Tracker" description="Monitor your expenses, set budgets, and gain insights into your financial habits. Stay on top of your finances with ease and take control of your future."/>
      <div className="col-span-full row-span-9 lg:col-span-6 lg:row-span-full flex justify-center items-center bg-gray-50">
        <div className="bg-white p-6 sm:p-12 border-none rounded-xl shadow-xl">
          <GoBackButton onGoBack={handleGoBack}/>  
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-indigo-600">Sign Up</h2>
          <p className="text-gray-500 mb-2 sm:mb-8">to continue to Expense Tracker</p>
          <form onSubmit={handleSignupSubmit} className="w-64 sm:w-80">        
            <label htmlFor="fullName"></label>              
            <AuthInputField             
              name="fullName" 
              id="fullName" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"              
            />
          
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

            <label htmlFor="confirmPassword"></label>              
            <AuthInputField
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword" 
              id="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              error={confirmPasswordError}
              icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              toggleVisibility={toggleConfirmPasswordVisibility}
            /> 
           <FormButton text="Sign Up"/>
            <p className="text-center">Already have an account?         
              <Link to="/login" className="text-indigo-500 hover:text-indigo-700 ml-2">Log In</Link>
            </p>
          </form>
        </div>
      </div>          
    </section>
  );
}

export default Signup;