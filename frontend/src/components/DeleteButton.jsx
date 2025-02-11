import { FaTrash } from "react-icons/fa";
import axios from "../api/axios";
import { toast } from "react-toastify";
import useDataProvider from '../hooks/useDataProvider'

const DeleteButton = ({ label }) => {
  const { fetchIncomes } = useDataProvider();
  
  const deleteIncome = async (id) => {
      try {
          await axios.delete(`/income/${id}`); 
          fetchIncomes();   
          toast.success('Income Deleted Successfully')             
      } catch (error) {            
          console.error("There was an error deleting the income", error);
      }
  }; 

  return (
    <button   
        onClick={() => deleteIncome(label._id)} 
        className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500">
        <FaTrash  className="text-white"/>
    </button>  
  )
};

export default DeleteButton;