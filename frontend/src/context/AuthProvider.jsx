import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] =  useState({});
    const [fullName, setFullName] = useState('');    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";  

    useEffect(() => {
        setEmailError('');
        setPasswordError('');
      }, [email, password])

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
            setEmail('');
            setPassword('');
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

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
      
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
            // Clear the form fields after successful signup
            setFullName('');
            setEmail('');
            setPassword('');            
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
        <AuthContext.Provider value={{ 
                auth, setAuth, fullName, setFullName,
                email, setEmail, emailError, setEmailError,
                password, setPassword, passwordError, setPasswordError, 
                handleLoginSubmit, handleSignupSubmit,
                confirmPassword, setConfirmPassword, confirmPasswordError, setConfirmPasswordError, 
                fullName, setFullName
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };