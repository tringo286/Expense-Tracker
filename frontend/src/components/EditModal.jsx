import { IoCloseSharp } from "react-icons/io5";
import { forwardRef } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "../api/axios";
import InputField from "../components/InputFields/InputField";
import useDataProvider from "../hooks/useDataProvider";

const EditModal = ({ title, dataType, fetchData, toggleModal, setIsModalOpen, currentEditData }) => {   
    const { 
        editCategory, setEditCategory,
        editDescription, setEditDescription,
        editAmount, setEditAmount,
        editDate, setEditDate,
     } = useDataProvider();

    const DatePickerCustomInput = forwardRef(
        ({ value, onClick, className }, ref) => (
            <button className={className} onClick={onClick} ref={ref} type="button">
                {value}
            </button>
        ),  
    );

    const handleUpdateSubmit = (e, dataId) => {
        e.preventDefault();
        
        const updatedData = {             
            [`${dataType}Category`]: editCategory,
            [`${dataType}Description`]: editDescription,
            [`${dataType}Amount`]: editAmount, 
            [`${dataType}Date`]: editDate 
        };
        updateData(dataId, updatedData);
        setIsModalOpen(false); // Close the update user form after sucessfully updating
        setEditCategory('');
        setEditDescription('');
        setEditAmount('');
        setEditDate(new Date()); 
        toast.success(`${dataType} Updated Successfully`);
    };
    
    const updateData = async (dataId, updatedData) => {
        try {            
            await axios.put(`/${dataType}/${dataId}`, updatedData);
            fetchData();                       
        } catch (error) {            
            console.error(`There was an error updating ${dataType}`, error);
        }
    };  

    return (
        <>
            <div 
                className='fixed inset-0 bg-gray-500 opacity-70 z-10' 
            />
            <div className='fixed inset-0 flex items-center justify-center z-20'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                    <div className='flex items-center justify-between mb-5 px-3'>
                        <h2 className='text-center text-xl font-bold text-indigo-600'>{title}</h2>                
                        <button className='text-2xl text-gray-600' onClick={toggleModal}><IoCloseSharp /></button>
                    </div>
                    <form onSubmit={(e) => handleUpdateSubmit(e, currentEditData._id)}>                 
                        <InputField 
                            name="category"                            
                            value={editCategory}
                            onChange={setEditCategory}
                            placeholder={`Enter a new ${dataType} title`}       
                            className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm mb-7'                  
                        />
                        <InputField 
                            name="description"                            
                            value={editDescription}
                            onChange={setEditDescription}
                            placeholder={`Enter a new ${dataType} description`}         
                            className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm mb-7'    
                            required={false}              
                        />                
                        <InputField 
                            name="amount"                            
                            value={editAmount}
                            onChange={setEditAmount}
                            placeholder={`Enter a new ${dataType} amount`}            
                            className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm mb-7'                  
                        /> 
                        <DatePicker
                            selected={editDate}
                            onChange={(date) => setEditDate(date)}
                            customInput={<DatePickerCustomInput className="mb-10 border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm text-left"/>}
                        />                                
                        <button 
                            type="submit" 
                            className="w-full bg-indigo-500 rounded-md py-2 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"                                           
                        >
                            Save
                        </button>                                            
                    </form>
                </div>
            </div>            
        </>
    )
};

export default EditModal;
