import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] =  useState({});
    const [fullName, setFullName] = useState('');    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');   
    const [confirmPasswordError, setConfirmPasswordError] = useState('');  
   
    const navigate = useNavigate();
    const location = useLocation();      

    useEffect(() => {
        setEmailError('');
        setPasswordError('');     
        setConfirmPasswordError('');   
    }, [fullName, email, password, confirmPassword, location])
    
    useEffect(() => {
      setFullName('');
      setEmail('');            
      setPassword('');
      setConfirmPassword('');
    }, [location]);      

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    const handleGoBack = () => {
      navigate(-1); 
    };
    
    return (
        <AuthContext.Provider value={{ 
          auth, setAuth, fullName, setFullName,
          email, setEmail, emailError, setEmailError,
          password, setPassword, passwordError, setPasswordError,          
          confirmPassword, setConfirmPassword, confirmPasswordError,setConfirmPasswordError,
          showPassword, 
          togglePasswordVisibility, 
          handleGoBack   
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
export { AuthProvider };