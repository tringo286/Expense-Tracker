import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';
import { toast } from 'react-toastify'

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
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');  
    const [role, setRole] = useState('');  
    const [users, setUsers] = useState([]);  
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";     

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

    useEffect(() => {
      fetchUsers(); 
    }, [])

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

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

    const fetchUsers = async () => {
        try {            
            const response = await axios.get('/users');
            const fetchedUsers = response.data.data;                              
            setUsers(fetchedUsers); 
        } catch (error) {
            console.error("An error occurred while getting users:", error.message);
        }
    }; 
    
    const handleUpdateUserSubmit = (e, userId) => {
      e.preventDefault();
      
      const updatedUser = {           
          fullName,
          email,
          role,    
      };
      updateUser(userId, updatedUser);
      setIsEditFormOpen(false); // Close the update user form after sucessfully updating
      setFullName('');
      setEmail('');
      setRole('');      
      toast.success('User Updated Successfully')
    };

    const updateUser = async (userId, updatedUser) => {
        try {            
            await axios.put(`/user/${userId}`, updatedUser);
            fetchUsers();                       
        } catch (error) {            
            console.error("There was an error updating the user", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/user/${id}`); 
            fetchUsers();         
            toast.success('User Deleted Successfully')             
        } catch (error) {            
            console.error("There was an error deleting the user", error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ 
          auth, setAuth, fullName, setFullName,
          email, setEmail, emailError, setEmailError,
          password, setPassword, passwordError, setPasswordError, 
          handleLoginSubmit, handleSignupSubmit,
          confirmPassword, setConfirmPassword, confirmPasswordError, setConfirmPasswordError,
          togglePasswordVisibility, showPassword,
          toggleConfirmPasswordVisibility, showConfirmPassword,  
          users, fetchUsers, role, setRole, deleteUser, handleUpdateUserSubmit,
          isEditFormOpen, setIsEditFormOpen
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider };