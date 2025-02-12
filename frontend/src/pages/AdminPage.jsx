import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";   
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify'
import useDataProvider from '../hooks/useDataProvider';

const Admin = () => {
  const {     
    fullName, 
    setFullName, 
    email, 
    setEmail, 
    password, 
    setPassword,     
   } = useAuth();      
  const {
    loading,
    setLoading
  } = useDataProvider();
  const [role, setRole] = useState('');  
  const [users, setUsers] = useState([]);  
  const [isEditUserFormOpen, setIsEditUserFormOpen] = useState(false);  
  const [searchQuery, setSearchQuery] = useState('');  
  const [searchResults, setSearchResults] = useState(users);
  const [currentEditedUser, setCurrentEditedUser] = useState(null);
  const [originalUserData, setOriginalUserData] = useState({
    fullName: "",
    email: "",
    role: ""
  });
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);  
  const [addUserErrors, setaddUserErrors] = useState('');

  const location = useLocation();

  useEffect(() => {
    setaddUserErrors('');     
  }, [fullName, email, password, role, location, isAddUserFormOpen])

  useEffect(() => {
    setFullName('');
    setEmail('');            
    setPassword('');
    setRole('');
  }, [location, isAddUserFormOpen]);

  useEffect(() => {
    if (users && users.length > 0) {
      searchUser(searchQuery);
    }    
  }, [searchQuery, users]);

  useEffect(() => {
    fetchUsers(); 
  }, [])  
  
  const toggleEditUserForm = (user) => {
    setIsEditUserFormOpen(!isEditUserFormOpen);
    if (user) {
      setCurrentEditedUser(user); // Set the user being edited
      setOriginalUserData({
        fullName: user.fullName,
        email: user.email,
        role: user.role
      });

      // Populate the data of current users in the input fields
      setFullName(user.fullName);
      setEmail(user.email);
      setRole(user.role);
    } else {
      setCurrentEditedUser(null); // Clear the current user when closing
    }
  }; 

  const toggleAddUserForm = () => {
    setIsAddUserFormOpen(!isAddUserFormOpen);    
  }; 

  const hasEditFormChanges = fullName !== originalUserData.fullName || 
    email !== originalUserData.email || 
    role !== originalUserData.role;
  
  const searchUser = (query) => {
    if(query.trim() === '') {
      setSearchResults(users);  
    } else {
      const searchResults = users.filter(user =>        
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase()) 
      );  
      setSearchResults(searchResults);  
    }
  };  

  const handleAddUserSubmit = async (event) => {
    event.preventDefault(); 
   
    try {
      await axios.post('/signup', {
        fullName,
        email,
        password,
        role,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });  

      toast.success('User Created Successfully');
      setIsAddUserFormOpen(!isAddUserFormOpen);
      fetchUsers();
      
    } catch (error) {
      console.error("An error occurred during adding new user:", error);  
      if (error.response) {
        console.log("Error response data:", error.response.data.errors);         
        setaddUserErrors(error.response.data.errors);      
      }       
    }
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

  const deleteUser = async (id) => {
      try {
          await axios.delete(`/user/${id}`); 
          fetchUsers();         
          toast.success('User Deleted Successfully')             
      } catch (error) {            
          console.error("There was an error deleting the user", error);
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
    setIsEditUserFormOpen(false); // Close the update user form after sucessfully updating
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

  return (
    <section className='bg-white h-[calc(100vh-80px)] w-full border rounded-3xl grid grid-cols-12 grid-rows-10 p-4'>      
      <div className="col-start-1 col-end-13 row-start-1 row-end-2 p-3">
        <div className='flex justify-between'>
          <h2 className='flex items-center text-2xl font-semibold text-indigo-500'>User Management</h2>
          <div className='flex items-center gap-2'>
            <form>
              <label htmlFor="search"></label>
              <div className='relative flex items-center gap-1'>
                <input 
                  type="text" 
                  id='search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search user by name, email or role'
                  className='w-72 pl-8 py-1 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-full placeholder:text-sm'
                />
                <div className='absolute left-2'>
                  <CiSearch />
                </div>
              </div>
            </form>
            <button 
              className='flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500' 
              onClick={toggleAddUserForm}
              title={'Add new user'}
            >
              <FaPlus className='text-white'/>                             
            </button>            
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-13 row-start-2 row-end-11 table-auto px-3 overflow-y-auto">      
        <table className="w-full">            
            <thead>
              <tr className="text-left bg-slate-200 text-indigo-500 position: sticky top-0">
                <th className="w-1/12 p-5">ID</th> 
                <th className="w-2/12">Full name</th> 
                <th className="w-3/12">Email</th> 
                <th className="w-2/12">Role</th> 
                <th className="w-2/12">Joined date</th>
                <th className="w-3/12">Actions</th>
              </tr> 
            </thead>  
            <tbody> 
              {loading ? ( 
                <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50 z-10">
                  <div className="spinner"></div>
                </div> 
              ) : (searchResults.length > 0 ? (
                searchResults.map((user, index) => (              
                  <tr
                  key={user._id}
                  className={`space-y-2 ${index % 2 === 1 ? 'bg-slate-50 shadow-md' : ''}`} // Apply gray background to even rows
                  >
                    <td className='px-5'>{index + 1}</td>
                    <td>{user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}</td>
                    <td>{user.email}</td>
                    <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'  
                    })}
                    </td>
                    <td className='flex items-center pb-3 gap-5'>
                      <button 
                        className='flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500' 
                        onClick={() => toggleEditUserForm(user)}
                        title={'Edit user'}
                      >
                        <MdEdit className='text-white'/>                    
                      </button>
                      <button 
                        onClick={() => deleteUser(user._id)} 
                        className='flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500'
                        title={'Delete user'}
                      >
                        <FaTrash className='text-white'/>                    
                      </button>
                    </td>                          
                  </tr>              
                  ))) : (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 text-xl py-4">No users available.</td>
                    </tr>
                  ))}
            </tbody>       
        </table>
        {isEditUserFormOpen && (
          <>
            <div 
              className='fixed inset-0 bg-gray-500 opacity-70 z-10' 
            />
            <div className='fixed inset-0 flex items-center justify-center z-20'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <div className='flex items-center justify-between mb-5 px-3'>
                  <h2 className='text-center text-xl font-bold text-indigo-600'>Update User</h2>                
                  <button className='text-2xl text-gray-600' onClick={toggleEditUserForm}><IoCloseSharp /></button>
                </div>
                <form onSubmit={(e) => handleUpdateUserSubmit(e, currentEditedUser._id)}>                 
                    <div className='mb-7'>
                      <label htmlFor="fullName"></label>
                      <input 
                        type="text" 
                        id='fullName'                      
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                        placeholder='Enter a new full name'
                      />
                    </div>

                    <div className='mb-7'>
                      <label htmlFor="email"></label>
                      <input 
                        type="email" 
                        id='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}      
                        className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                        placeholder='Enter a new email'               
                      />
                    </div>

                    <div>
                      <label htmlFor="role"></label>
                      <input 
                        type="text" 
                        id='role' 
                        value={role}
                        onChange={(e) => setRole(e.target.value)} 
                        className='mb-10 border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                        placeholder='Enter a new role'                    
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-indigo-500 rounded-md py-2 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                      disabled={!hasEditFormChanges} 
                      title={hasEditFormChanges ? '' : 'Please make at least one change before saving'} // Tooltip text                      
                    >
                      Save
                    </button>
                                      
                </form>
              </div>
            </div>            
          </>
        )}
        {isAddUserFormOpen && (
          <>
            <div 
              className='fixed inset-0 bg-gray-500 opacity-70 z-10' 
            />
            <div className='fixed inset-0 flex items-center justify-center z-20'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <div className='flex items-center justify-between mb-5 px-3'>
                  <h2 className='text-center text-xl font-bold text-indigo-600'>Add User</h2>                
                  <button className='text-2xl text-gray-600' onClick={toggleAddUserForm}><IoCloseSharp /></button>
                </div>
                <form onSubmit={handleAddUserSubmit}>                 
                    <div className='mb-7'>
                      <label htmlFor="fullName"></label>
                      <input 
                        type="text" 
                        id='fullName'                      
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                        placeholder='Enter a full name'
                        required                        
                      />
                    </div>

                    <div className='mb-7'>
                      <label htmlFor="email"></label>
                      <input 
                        type="email" 
                        id='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}      
                        className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                        placeholder='Enter an email'  
                        required             
                      />
                    </div>
                    <div className='mb-7'>
                      <label htmlFor="password"></label>
                      <input 
                        type="password" 
                        id='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}      
                        className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                        placeholder='Enter a password'    
                        required           
                      />
                    </div>
                    
                    <div>
                      {/* <label htmlFor="role" className="mb-2">Role</label> */}
                      <select 
                        id="role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        className="mb-3 border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm"
                        required
                      >
                        <option value="">Select a role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div>                      
                      {addUserErrors && Object.values(addUserErrors).length > 0 && (
                        <div className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mb-3">
                          <p>{Object.values(addUserErrors)[0]}</p>
                        </div>
                      )}
                    </div>                
                    <button 
                      type="submit" 
                      className="w-full bg-indigo-500 rounded-md py-2 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-1 mt-3"                   
                                       
                    >
                      Save
                    </button>                                      
                </form>
              </div>
            </div>            
          </>
        )}
      </div>       
    </section>
  )
}

export default Admin;