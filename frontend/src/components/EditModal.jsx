import { IoCloseSharp } from "react-icons/io5";
import { forwardRef } from 'react';
import InputField from "./InputField";
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "../api/axios";
import useIncomeProvider from "../hooks/useIncomeProvider";

const EditModal = ({ title, income, fetchIncomes }) => {
    const { 
        editIncomeCategory, setEditIncomeCategory,
        editIncomeDescription, setEditIncomeDescription,
        editIncomeAmount, setEditIncomeAmount,
        editIncomeDate, setEditIncomeDate,
        toggleEditIncomeForm,
        setIsEditIncomeFormOpen
    } = useIncomeProvider();

    const DatePickerCustomInput = forwardRef(
        ({ value, onClick, className }, ref) => (
            <button className={className} onClick={onClick} ref={ref} type="button">
                {value}
            </button>
        ),  
    );

    const handleUpdateIncomeSubmit = (e, incomeId) => {
        e.preventDefault();
        
        const updatedIncome = {             
            incomeCategory: editIncomeCategory,
            incomeDescription: editIncomeDescription,
            incomeAmount: editIncomeAmount, 
            incomeDate: editIncomeDate 
        };
        updateIncome(incomeId, updatedIncome);
        setIsEditIncomeFormOpen(false); // Close the update user form after sucessfully updating
        setEditIncomeCategory('');
        setEditIncomeDescription('');
        setEditIncomeAmount('');
        setEditIncomeDate(new Date()); 
        toast.success('Income Updated Successfully');
    };
    
    const updateIncome = async (incomeId, updatedIncome) => {
        try {            
            await axios.put(`/income/${incomeId}`, updatedIncome);
            fetchIncomes();                       
        } catch (error) {            
            console.error("There was an error updating the income", error);
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
                        <button className='text-2xl text-gray-600' onClick={toggleEditIncomeForm}><IoCloseSharp /></button>
                    </div>
                    <form onSubmit={(e) => handleUpdateIncomeSubmit(e, income._id)}>                 
                        <InputField 
                            name="category"                            
                            value={editIncomeCategory}
                            onChange={setEditIncomeCategory}
                            placeholder='Enter a new income title'          
                            className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm mb-7'                  
                        />
                        <InputField 
                            name="description"                            
                            value={editIncomeDescription}
                            onChange={setEditIncomeDescription}
                            placeholder='Enter a new income description'          
                            className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm mb-7'                  
                        />                
                        <InputField 
                            name="amount"                            
                            value={editIncomeAmount}
                            onChange={setEditIncomeAmount}
                            placeholder='Enter a new income amount'          
                            className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm mb-7'                  
                        /> 
                        <DatePicker
                            selected={editIncomeDate}
                            onChange={(date) => setEditIncomeDate(date)}
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
