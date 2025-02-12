import { MdEdit } from "react-icons/md";

const EditButton = ({ label, toggleModal }) => {
  return (
    <button 
        onClick={() => toggleModal(label)} 
        className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><MdEdit className="text-white"/>
    </button>   
  )
};

export default EditButton;