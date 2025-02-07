import { useState, useEffect, forwardRef } from 'react';
import { FaPlus, FaTrash, FaDollarSign, FaCalendar } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import useDataProvider from '../hooks/useDataProvider';
import axios from '../api/axios';
import "react-datepicker/dist/react-datepicker.css";
import InputField from '../components/InputField';

const IncomePage = () => {
    const { totalIncomes, incomes, fetchIncomes } = useDataProvider();
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUserId = user.userId;

    const [incomeCategory, setIncomeCategory] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeAmountError, setIncomeAmountError] = useState('');
    const [incomeDate, setIncomeDate] = useState(new Date());
    const [isEditIncomeFormOpen, setIsEditIncomeFormOpen] = useState(false);
    const [currentEditedIncome, setCurrentEditedIncome] = useState(null);
    const [originalIncomeData, setOriginalIncomeData] = useState({
        incomeCategory: "", incomeDescription: "", incomeAmount: "", incomeDate: ""
    });  
    
    const hasChanges = incomeCategory !== originalIncomeData.incomeCategory || 
        incomeDescription !== originalIncomeData.incomeDescription || 
        incomeAmount !== originalIncomeData.incomeAmount || 
        incomeDate !== originalIncomeData.incomeDate;    

    // Sort incomes from newest to oldest
    incomes.sort((a, b) => new Date(b.incomeDate) - new Date(a.incomeDate)); 

    useEffect(() => {
        setIncomeAmountError('');           
    }, [incomeCategory, incomeAmount, incomeDescription, incomeDate, location])

    useEffect(() => {       
        setIncomeDate(new Date());
    }, [location, isEditIncomeFormOpen])

    const toggleEditIncomeForm = (income) => {
        setIsEditIncomeFormOpen(!isEditIncomeFormOpen);
        if (income) {
            setCurrentEditedIncome(income); // Set the income being edited
            setOriginalIncomeData({
                incomeCategory: income.incomeCategory,
                incomeDescription: income.incomeDescription,
                incomeAmount: income.incomeAmount,
                incomeDate: income.incomeDate
        });
            // Populate the data of current income in the input fields
            setIncomeCategory(income.incomeCategory);
            setIncomeDescription(income.incomeDescription);
            setIncomeAmount(income.incomeAmount);
            setIncomeDate(income.incomeDate);
        } else {
            setCurrentEditedIncome(null); // Clear the current income when closing
        }
    };
    
    const handleUpdateIncomeSubmit = (e, incomeId) => {
        e.preventDefault();
        
        const updatedIncome = {             
            incomeCategory,
            incomeDescription,
            incomeAmount, 
            incomeDate   
        };
        updateIncome(incomeId, updatedIncome);
        setIsEditIncomeFormOpen(false); // Close the update user form after sucessfully updating
        setIncomeCategory('');
        setIncomeDescription('');
        setIncomeAmount('');
        setIncomeDate('');    
        setIncomeDate(new Date()); 
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

    const handleAddIncomeSubmit = (e) => {
        e.preventDefault();
        if (incomeAmountError === '') {
            const newIncome = {
                userId: currentUserId,
                incomeCategory,
                incomeDescription,
                incomeAmount,
                incomeDate,
            };
            addIncome(newIncome);
            setIncomeCategory('');
            setIncomeDescription('');
            setIncomeAmount('');
            setIncomeDate('');   
            setIncomeDate(new Date());         
        }             
    };

    const addIncome = async (income) => {
        try {
            await axios.post('/income', income);
            fetchIncomes();              
            toast.success('Income Added Successfully');    
        } catch (error) {            
            console.error("There was an error adding the income", error.response.data.message);            
            setIncomeAmountError(error.response.data.message);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`/income/${id}`); 
            fetchIncomes();   
            toast.success('Income Deleted Successfully')             
        } catch (error) {            
            console.error("There was an error deleting the income", error);
        }
    }; 

    const DatePickerCustomInput = forwardRef(
        ({ value, onClick, className }, ref) => (
          <button className={className} onClick={onClick} ref={ref} type="button">
            {value}
          </button>
        ),
    );
    
    return (
        <section className='bg-white h-[calc(100vh-80px)] w-full border rounded-3xl grid grid-cols-12 grid-rows-12 p-3'>           
            <div className='col-start-1 col-end-13 row-start-1 row-end-4 px-3 pt-3 flex flex-col justify-around'>
                <h1 className="flex items-center text-3xl font-semibold text-indigo-500">Incomes</h1>
                <div className='flex justify-center items-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-xl shadow-lg'>                    
                    <h2 className=" text-2xl font-semibold text-indigo-500">Total Income:</h2>
                    <p className='text-lime-500 text-3xl font-semibold'>${totalIncomes}</p>
                </div>
            </div>
            <div className='col-start-1 col-end-5 row-start-4 row-end-11'>
                <form onSubmit={handleAddIncomeSubmit} className='flex flex-col gap-6 h-full p-3'>
                    <InputField 
                        name="category"                            
                        value={incomeCategory}
                        onChange={setIncomeCategory}
                        placeholder='Income Title'                            
                    />
                    <InputField 
                        name="description"                            
                        value={incomeDescription}
                        onChange={setIncomeDescription}
                        placeholder='Income Description (Optional)'
                        required={false}                            
                    />
                    <InputField 
                        name="amount"                            
                        value={incomeAmount}
                        onChange={setIncomeAmount}
                        placeholder='Income Amount'
                        error={incomeAmountError}             
                    />                      
                    <div className="w-full">
                    <DatePicker
                        selected={incomeDate}
                        onChange={(date) => setIncomeDate(date)}
                        customInput={<DatePickerCustomInput className=" text-left bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full  focus:outline-none focus:ring-2 focus:ring-indigo-500" />}
                    />
                    </div>
                    <div className='bg-indigo-500 border rounded-full shadow-lg p-4 flex justify-center items-center gap-3 text-xl w-2/3'>
                        <div className='text-white'><FaPlus /></div>
                        <button
                            className='text-white'
                            type="submit"   
                        >
                            Add Income
                        </button>
                    </div>
                </form>
            </div>
            
            <div className='col-start-5 col-end-13 row-start-4 row-end-13 flex flex-col gap-y-5 p-3 overflow-y-auto'>
                {incomes.length > 0 ? (
                    incomes.map(income => (
                        <div key={income._id} className="flex justify-between items-center p-4 text-gray-500 bg-white border border-slate-200 rounded-xl shadow-lg">
                            <div className='flex flex-col w-10/12 gap-3'>
                                <div className='flex items-center gap-2 text-lime-500'>
                                    <div className='text-2xl'><GoDotFill /></div>
                                    <div className='text-lg font-semibold'>{income.incomeCategory.charAt(0).toUpperCase() + income.incomeCategory.slice(1)}</div>
                                </div>
                                <div className='grid grid-cols-8'>                                    
                                        <div className='col-span-3'>
                                            {income.incomeDescription && (
                                                <div className='flex items-center gap-2 '>
                                                    <div className='normal-weight'><BsChatFill /></div>
                                                    <div> {income.incomeDescription}</div>
                                                </div>
                                            )}  
                                        </div>                                                                      
                                    <div className='flex items-center col-span-2'>
                                        <div><FaDollarSign /></div>
                                        <div>{income.incomeAmount}</div>
                                    </div>
                                    <div className='flex items-center gap-2 col-span-3'>
                                        <FaCalendar />
                                        <div>Date: {new Date(income.incomeDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',   
                                            day: 'numeric'  
                                            })}
                                        </div>                        
                                    </div>              
                                </div>
                            </div>
                            <button onClick={() => toggleEditIncomeForm(income)} className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><MdEdit  className="text-white"/></button>   
                            <button onClick={() => deleteIncome(income._id)} className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><FaTrash  className="text-white"/></button>                            
                        </div>
                    ))) : (
                        <p className="text-center text-gray-500 text-xl">No incomes available.</p>
                    )              
                }                
            </div>     
            {isEditIncomeFormOpen && (
                <>
                    <div 
                        className='fixed inset-0 bg-gray-500 opacity-70 z-10' 
                    />
                    <div className='fixed inset-0 flex items-center justify-center z-20'>
                        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                            <div className='flex items-center justify-between mb-5 px-3'>
                                <h2 className='text-center text-xl font-bold text-indigo-600'>Update Income</h2>                
                                <button className='text-2xl text-gray-600' onClick={toggleEditIncomeForm}><IoCloseSharp /></button>
                            </div>
                            <form onSubmit={(e) => handleUpdateIncomeSubmit(e, currentEditedIncome._id)}>                 
                                <div className='mb-7'>
                                    <label htmlFor="category"></label>
                                    <input 
                                    type="text" 
                                    id='category'                      
                                    value={incomeCategory}
                                    onChange={e => setIncomeCategory(e.target.value)}
                                    className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                                    placeholder='Enter a new income title'
                                    />
                                </div>
            
                                <div className='mb-7'>
                                    <label htmlFor="description"></label>
                                    <input 
                                    type="text" 
                                    id='description' 
                                    value={incomeDescription}
                                    onChange={(e) => setIncomeDescription(e.target.value)}      
                                    className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                                    placeholder='Enter a new income description'               
                                    />
                                </div>
            
                                <div>
                                    <label htmlFor="amount"></label>
                                    <input 
                                    type="text" 
                                    id='amount' 
                                    value={incomeAmount}
                                    onChange={(e) => setIncomeAmount(e.target.value)} 
                                    className='mb-10 border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                                    placeholder='Enter a new amount'                    
                                    />
                                </div>

                                <div>
                                    <DatePicker
                                        selected={incomeDate}
                                        onChange={(date) => setIncomeDate(date)}
                                        className="mb-10 border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm"
                                        wrapperClassName="datepicker-wrapper w-full"  // Apply custom class to the outer wrapper
                                        placeholderText="Select a Date"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="w-full bg-indigo-500 rounded-md py-2 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                                    disabled={!hasChanges} 
                                    title={hasChanges ? '' : 'Please make at least one change before saving'} // Tooltip text                      
                                >
                                    Save
                                </button>                                                
                            </form>
                        </div>
                    </div>            
                </>
            )}           
        </section>
    )
}

export default IncomePage
