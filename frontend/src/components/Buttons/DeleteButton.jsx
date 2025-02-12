import { FaTrash } from "react-icons/fa";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const DeleteButton = ({ label, type, fetchData }) => {    
  const deleteItem = async (id) => {
    try {
      await axios.delete(`/${type}/${id}`);  // Use the dynamic type here
      fetchData();   // Fetch either income or expense depending on type
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} Deleted Successfully`);
    } catch (error) {
      console.error(`There was an error deleting the ${type}`, error);
    }
  };  

  return (
    <button   
        onClick={() => deleteItem(label._id)} 
        className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500">
        <FaTrash  className="text-white"/>
    </button>  
  )
};

export default DeleteButton;