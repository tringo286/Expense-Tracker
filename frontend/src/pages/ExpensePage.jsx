    import useDataProvider from '../hooks/useDataProvider';
    import { FaPlus } from "react-icons/fa";
    import { FaTrash } from "react-icons/fa";   
    import { BsChatFill } from "react-icons/bs";
    import { GoDotFill } from "react-icons/go";
    import { FaDollarSign } from "react-icons/fa";
    import { FaCalendar } from "react-icons/fa";
    import DatePicker from 'react-datepicker';
    import "react-datepicker/dist/react-datepicker.css";
    import { useState } from 'react';
    import { IoCloseSharp } from "react-icons/io5";
    import axios from '../api/axios';
    import { toast } from 'react-toastify'
    import { MdEdit } from "react-icons/md";

    const ExpensePage = () => {
    const {
        totalExpenses, 
        expenseCategory, 
        setExpenseCategory, 
        expenseDescription, 
        setExpenseDescription, 
        expenseDate, 
        setExpenseDate, 
        expenseAmount, 
        setExpenseAmount,
        handleExpenseSubmit,     
        deleteExpense,
        expenses,    
        fetchExpenses,
    }  = useDataProvider();  

    // Sort expenses from newest to oldest
    expenses.sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate));
    
    const [isOpen, setIsOpen] = useState(false);
    const [currentEditedExpense, setCurrentEditedExpense] = useState(null);
    const [originalExpenseData, setOriginalExpenseData] = useState({
        expenseCategory: "",
        expenseDescription: "",
        expenseAmount: "",
        expenseDate: ""
    });

    const toggleEditExpenseForm = (expense) => {
        setIsOpen(!isOpen);
        if (expense) {
            setCurrentEditedExpense(expense); // Set the expense being edited
            setOriginalExpenseData({
                expenseCategory: expense.expenseCategory,
                expenseDescription: expense.expenseDescription,
                expenseAmount: expense.expenseAmount,
                expenseDate: expense.expenseDate
        });
            // Populate the data of current expense in the input fields
            setExpenseCategory(expense.expenseCategory);
            setExpenseDescription(expense.expenseDescription);
            setExpenseAmount(expense.expenseAmount);
            setExpenseDate(expense.expenseDate);
        } else {
            setCurrentEditedExpense(null); // Clear the current expense when closing
        }
    };
        
    const handleUpdateExpenseSubmit = (e, expenseId) => {
        e.preventDefault();
        
        const updatedExpense = {           
            expenseCategory,
            expenseDescription,
            expenseAmount, 
            expenseDate   
        };
        updateExpense(expenseId, updatedExpense);
        setIsOpen(false); // Close the update user form after sucessfully updating
        setExpenseCategory('');
        setExpenseDescription('');
        setExpenseAmount('');
        setExpenseDate('');    
        toast.success('Expense Updated Successfully')
    };

    const updateExpense = async (expenseId, updatedExpense) => {
        try {            
            await axios.put(`/expense/${expenseId}`, updatedExpense); 
            fetchExpenses();                       
        } catch (error) {            
            console.error("There was an error updating the expense", error);
        }
    };

    const hasChanges = expenseCategory !== originalExpenseData.expenseCategory || 
        expenseDescription !== originalExpenseData.expenseDescription || 
        expenseAmount !== originalExpenseData.expenseAmount || 
        expenseDate !== originalExpenseData.expenseDate;

    return (
        <section className='bg-white h-[calc(100vh-80px)] w-full border rounded-3xl grid grid-cols-12 grid-rows-12 p-3'>           
            <div className='col-start-1 col-end-13 row-start-1 row-end-4 px-3 pt-3 flex flex-col justify-around'>
                <h1 className="flex items-center text-3xl font-semibold text-indigo-500">Expenses</h1>
                <div className='flex justify-center items-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-xl shadow-lg'>                    
                    <h2 className="text-2xl font-semibold text-indigo-500">Total Expense:</h2>
                    <p className='text-red-500 text-3xl font-semibold'>-${totalExpenses}</p>
                </div>
            </div>
            <div className='col-start-1 col-end-5 row-start-4 row-end-11'>
                <form onSubmit={handleExpenseSubmit} className='flex flex-col gap-6 h-full p-3'>
                    <div>
                        <label htmlFor='category' className='block'></label>
                        <input 
                            type="text"
                            id='category'
                            name='category'
                            placeholder='Expense Title'
                            className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            required
                            value={expenseCategory}
                            onChange={(e) => setExpenseCategory(e.target.value)}                        
                        />
                    </div>
                    <div>
                        <label htmlFor='description' className='block'></label>
                        <input 
                            type="text"
                            id='description'
                            name='description'
                            placeholder='Expense Description (Optional)'
                            className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'                        
                            value={expenseDescription}
                            onChange={(e) => setExpenseDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='amount' className='block'></label>
                        <input 
                            type="text"
                            id='amount'
                            name='amount'
                            placeholder='Expense Amount'
                            className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            required
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <DatePicker
                            selected={expenseDate}
                            onChange={(date) => setExpenseDate(date)}
                            className="bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full block focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            wrapperClassName="datepicker-wrapper w-full"  // Apply custom class to the outer wrapper
                            placeholderText="Enter a Date"
                            dateFormat="MM/dd/yyyy"
                        />
                    </div>
                    <div className='bg-indigo-500 border rounded-full shadow-lg p-4 flex justify-center items-center gap-3 text-xl'>
                        <div className='text-white'><FaPlus /></div>
                        <button
                            className='text-white'
                            type="submit"
                        >
                            Add Expense
                        </button>
                    </div>                
                </form>
            </div>
            <div className='col-start-5 col-end-13 row-start-4 row-end-13 flex flex-col gap-y-5 p-3 overflow-y-auto'>
                {expenses.length > 0 ? (
                    expenses.map(expense => (
                        <div key={expense._id} className="flex justify-between items-center p-4 text-gray-500 bg-white border border-slate-200 rounded-xl shadow-lg">
                            <div className='flex flex-col w-10/12 gap-3'>
                                <div className='flex items-center gap-2 text-red-500'>
                                    <div className='text-2xl'><GoDotFill /></div>
                                    <div className='text-lg font-semibold'>{expense.expenseCategory.charAt(0).toUpperCase() + expense.expenseCategory.slice(1)}</div>
                                </div>
                                <div className='grid grid-cols-8'>
                                    <div className='col-span-3'>
                                        {expense.expenseDescription && (
                                            <div className='flex items-center gap-2 '>
                                                <div className='normal-weight'><BsChatFill /></div>
                                                <div> {expense.expenseDescription}</div>
                                            </div>
                                        )}  
                                    </div>  
                                    <div className='flex items-center col-span-2'>
                                        <div><FaDollarSign /></div>
                                        <div>{expense.expenseAmount}</div>
                                    </div>
                                    <div className='flex items-center gap-2 col-span-3'>
                                        <FaCalendar />
                                        <div>Date: {new Date(expense.expenseDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'numeric',   
                                            day: 'numeric'  
                                            })} 
                                        </div>                        
                                    </div>              
                                </div>
                            </div>
                            <button onClick={() => toggleEditExpenseForm(expense)} className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><MdEdit  className="text-white"/></button>  
                            <button onClick={() => deleteExpense(expense._id)} className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><FaTrash  className="text-white"/></button>                             
                        </div>
                    ))) : (
                        <p className="text-center text-gray-500 text-xl">No expenses available.</p>
                    )              
                }
                {isOpen && (
                    <>
                    <div 
                        className='fixed inset-0 bg-gray-500 opacity-70 z-10' 
                    />
                    <div className='fixed inset-0 flex items-center justify-center z-20'>
                        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                        <div className='flex items-center justify-between mb-5 px-3'>
                            <h2 className='text-center text-xl font-bold text-indigo-600'>Update Expense</h2>                
                            <button className='text-2xl text-gray-600' onClick={toggleEditExpenseForm}><IoCloseSharp /></button>
                        </div>
                        <form onSubmit={(e) => handleUpdateExpenseSubmit(e, currentEditedExpense._id)}>                 
                            <div className='mb-7'>
                                <label htmlFor="category"></label>
                                <input 
                                type="text" 
                                id='category'                      
                                value={expenseCategory}
                                onChange={e => setExpenseCategory(e.target.value)}
                                className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                                placeholder='Enter a new expense title'
                                />
                            </div>
        
                            <div className='mb-7'>
                                <label htmlFor="description"></label>
                                <input 
                                type="text" 
                                id='description' 
                                value={expenseDescription}
                                onChange={(e) => setExpenseDescription(e.target.value)}      
                                className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                                placeholder='Enter a new expense description'               
                                />
                            </div>
        
                            <div>
                                <label htmlFor="amount"></label>
                                <input 
                                type="text" 
                                id='amount' 
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)} 
                                className='mb-10 border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
                                placeholder='Enter a new amount'                    
                                />
                            </div>

                            <div>
                                <DatePicker
                                    selected={expenseDate}
                                    onChange={(date) => setExpenseDate(date)}
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
            </div>                
        </section>
    )
    }

    export default ExpensePage
