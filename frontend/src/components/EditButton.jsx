import { MdEdit } from "react-icons/md";
import useIncomeProvider from "../hooks/useIncomeProvider";

const EditButton = ({ label }) => {
  const { toggleEditIncomeForm } = useIncomeProvider();
  
  return (
    <button 
        onClick={() => toggleEditIncomeForm(label)} 
        className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><MdEdit className="text-white"/>
    </button>   
  )
};

export default EditButton;