import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] =  useState({});
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState(''); 
    const [passwordError, setPasswordError] = useState('');

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
            setEmailError(error.response.data.errors.email);
            setPasswordError(error.response.data.errors.password);
          }       
        }
    };
    
    return (
        <AuthContext.Provider value={{ 
                auth, setAuth,
                email, setEmail, emailError, setEmailError,
                password, setPassword, passwordError, setPasswordError, 
                handleLoginSubmit, handleSignupSubmit
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };