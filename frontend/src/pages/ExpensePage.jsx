import useDataProvider from '../hooks/useDataProvider';
import { FaPlus } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from '../api/axios';
import { toast } from 'react-toastify'
import InputField from '../components/InputFields/InputField';
import { useState, useEffect, forwardRef } from 'react';
import TransactionCard from '../components/Cards/TransactionCard';
import EditModal from '../components/EditModal';

const ExpensePage = () => {
    const {
        totalExpenses,       
        expenses,    
        fetchExpenses,
        setEditCategory,
        setEditDescription,
        setEditAmount,
        setEditDate,  
        loading,    
    }  = useDataProvider();  

    const user = JSON.parse(localStorage.getItem('user'));
    const currentUserId = user.userId;

    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseAmountError, setExpenseAmountError] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());

    // Sort expenses from newest to oldest
    expenses.sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate));  
    
    const [isEditExpenseFormOpen, setIsEditExpenseFormOpen] = useState(false);
    const [currentEditedExpense, setCurrentEditedExpense] = useState(null); 
    
    useEffect(() => {
            setExpenseAmountError('');           
        }, [expenseCategory, expenseAmount, expenseDescription, expenseDate, location])
    
        useEffect(() => {       
            setExpenseDate(new Date());
        }, [location, isEditExpenseFormOpen])    

    const handleAddExpenseSubmit = (e) => {
        e.preventDefault();
        if (expenseAmountError === '') {
            const newExpense = {
                userId: currentUserId,
                expenseCategory,
                expenseDescription,
                expenseAmount,
                expenseDate,
            };
            addExpense(newExpense);
            setExpenseCategory('');
            setExpenseDescription('');
            setExpenseAmount('');
            setExpenseDate('');   
            setExpenseDate(new Date());         
        }             
    };

    const addExpense = async (expense) => {
        try {
            await axios.post('/expense', expense);
            fetchExpenses();              
            toast.success('Expense Added Successfully');    
        } catch (error) {            
            console.error("There was an error adding the expense", error.response.data.message);            
            setExpenseAmountError(error.response.data.message);
        }
    };
    
    const toggleEditExpenseForm = (expense) => {
        setIsEditExpenseFormOpen(!isEditExpenseFormOpen);
        if (expense) {
            setCurrentEditedExpense(expense); // Set the expense being edited
            
            // Populate the data of current expense in the input fields
            setEditCategory(expense.expenseCategory);
            setEditDescription(expense.expenseDescription);
            setEditAmount(expense.expenseAmount);
            setEditDate(expense.expenseDate);
        } else {
            setCurrentEditedExpense(null); // Clear the current expense when closing
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
        <section className='bg-white h-[calc(100vh-160px)] lg:h-[calc(100vh-80px)] w-full border rounded-3xl grid grid-cols-12 grid-rows-12 p-4'>   

            <div className='col-start-1 col-end-13 row-start-1 row-end-3 sm:row-end-3 md:row-end-3 md:pt-3 flex flex-col justify-center gap-3 w-full'>
                <h1 className="flex items-center text-xl md:text-3xl font-semibold text-indigo-500">Expense</h1>
                <div className='flex justify-center items-center gap-2 py-2 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl shadow-lg'>
                    <h2 className="text-xl md:text-2xl font-semibold text-indigo-500">Total Expense:</h2>
                    <p className='text-red-500 text-xl md:text-2xl font-semibold'>-${totalExpenses}</p>
                </div>
            </div>

            <div className='col-span-full md:col-start-1 md:col-end-5 row-start-3 row-end-9 sm:row-end-6 md:row-end-13 sm:mt-3'>
                <form onSubmit={handleAddExpenseSubmit} className='flex items-center md:items-start flex-col gap-3 md:gap-4 h-full w-full'>
                    <InputField 
                        name="category"                            
                        value={expenseCategory}
                        onChange={setExpenseCategory}
                        placeholder='Expense Title'                            
                    />                   
                    <InputField 
                    name="description"                            
                    value={expenseDescription}
                    onChange={setExpenseDescription}
                    placeholder='Expense Description (Optional)'
                    required={false}                            
                    />
                    <InputField 
                        name="amount"                            
                        value={expenseAmount}
                        onChange={setExpenseAmount}
                        placeholder='Expense Amount'
                        className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 sm:mb-0'
                        error={expenseAmountError}             
                    />                            
                    <div className="w-full">
                        <DatePicker
                            selected={expenseDate}
                            onChange={(date) => setExpenseDate(date)}
                            customInput={<DatePickerCustomInput className=" text-left bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-4 mb-2 sm:mb-4" />}
                        />
                    </div>
                    <div className='bg-indigo-500 border rounded-full shadow-lg p-1 md:p-2 lg:p-3 xl:p-4 flex justify-center items-center gap-3 xl:text-xl w-48 md:w-2/3'>
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
            <div className='col-span-full md:col-start-5 md:col-end-13 row-start-10 row-end-13 md:row-start-3 md:row-end-13 flex flex-col gap-y-5 p-3 overflow-y-auto sm:mt-4'>
                {loading ? (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50 z-10">
                        <div className="spinner"></div>
                    </div>
                ) : expenses.length > 0 ? (
                    expenses.map(expense => (
                        <TransactionCard 
                            key={expense._id} 
                            label={expense}
                            labelCategory={expense.expenseCategory}
                            labelDescription={expense.expenseDescription}
                            labelAmount={expense.expenseAmount}
                            labelDate={expense.expenseDate}
                            toggleModal={toggleEditExpenseForm}
                            fetchData={fetchExpenses} 
                            dataType='expense'
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-xl">No expenses available.</p>
                )}               
                {isEditExpenseFormOpen && (                    
                    <EditModal 
                       title='Expense' 
                       dataType='expense' 
                       fetchData={fetchExpenses} 
                       toggleModal={toggleEditExpenseForm}    
                       setIsModalOpen={setIsEditExpenseFormOpen}     
                       currentEditData={currentEditedExpense}
                   />                        
                )}
            </div>                
        </section>
    )
}

export default ExpensePage;
