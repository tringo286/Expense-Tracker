import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ deleteFunction, label }) => {
  return (
    <button 
        onClick={() => deleteFunction(label._id)} 
        className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500">
        <FaTrash  className="text-white"/>
    </button>  
  )
};

export default DeleteButton;