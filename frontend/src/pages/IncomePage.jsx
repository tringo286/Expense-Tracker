import { useState, useEffect, forwardRef } from 'react';
import { FaPlus} from "react-icons/fa";
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import InputField from '../components/InputFields/InputField';
import TransactionCard from '../components/Cards/TransactionCard';
import EditModal from '../components/EditModal';
import useDataProvider from '../hooks/useDataProvider';
import axios from '../api/axios';

const IncomePage = () => {    
    const {           
        incomes,
        totalIncomes,
        fetchIncomes,
        setEditCategory,
        setEditDescription,
        setEditAmount,
        setEditDate,    
        loading,
    } = useDataProvider();    

    const user = JSON.parse(localStorage.getItem('user'));
    const currentUserId = user.userId;

    const [incomeCategory, setIncomeCategory] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeAmountError, setIncomeAmountError] = useState('');
    const [incomeDate, setIncomeDate] = useState(new Date());

    const [currentEditedIncome, setCurrentEditedIncome] = useState(null);    
    const [isEditIncomeFormOpen, setIsEditIncomeFormOpen] = useState(false);    

    // Sort incomes from newest to oldest
    incomes.sort((a, b) => new Date(b.incomeDate) - new Date(a.incomeDate)); 

    useEffect(() => {
        setIncomeAmountError('');           
    }, [incomeCategory, incomeAmount, incomeDescription, incomeDate, location])

    useEffect(() => {       
        setIncomeDate(new Date());
    }, [location, isEditIncomeFormOpen])    

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

    const toggleEditIncomeForm = (income) => {
        setIsEditIncomeFormOpen(!isEditIncomeFormOpen);
        if (income) {
            setCurrentEditedIncome(income); // Set the income being edited
            
            // Populate the data of current income in the input fields
            setEditCategory(income.incomeCategory);
            setEditDescription(income.incomeDescription);
            setEditAmount(income.incomeAmount);
            setEditDate(income.incomeDate);
        } else {
            setCurrentEditedIncome(null); // Clear the current income when closing
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
                <h1 className="flex items-center sm:text-xl md:text-3xl font-semibold text-indigo-500">Incomes</h1>
                <div className='flex justify-center items-center gap-2 py-2 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl shadow-lg'>
                    <h2 className="sm:text-xl md:text-2xl font-semibold text-indigo-500">Total Income:</h2>
                    <p className='text-lime-500 text-xl md:text-2xl font-semibold'>${totalIncomes}</p>
                </div>
            </div>

            <div className='col-span-full md:col-start-1 md:col-end-5 row-start-3 row-end-6 sm:row-end-6 md:row-end-13 sm:mt-3'>
                <form onSubmit={handleAddIncomeSubmit} className='flex items-center md:items-start flex-col gap-3 md:gap-4 h-full w-full'>
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
                        className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 sm:mb-0 text-sm sm:text-base py-1 sm:py-3'
                        error={incomeAmountError}             
                    />                      
                    <DatePicker
                            selected={incomeDate}
                            onChange={(date) => setIncomeDate(date)}
                            customInput={<DatePickerCustomInput className="text-left bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 w-full  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-4 mb-2 sm:mb-4 text-sm sm:text-base py-1 sm:py-3" />}
                    />
                    <div className='bg-indigo-500 border rounded-full shadow-lg p-1 md:p-2 lg:p-3 xl:p-4 flex justify-center items-center gap-3 xl:text-xl w-48 md:w-2/3'>
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
        
            <div className='col-span-full md:col-start-5 md:col-end-13 row-start-10 row-end-13 md:row-start-3 md:row-end-13 flex flex-col gap-y-5 p-3 overflow-y-auto sm:mt-4'>
                {loading ? (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50 z-10">
                        <div className="spinner"></div>
                    </div>
                ) : incomes.length > 0 ? (
                    incomes.map(income => (
                        <TransactionCard 
                            key={income._id} 
                            label={income}
                            labelCategory={income.incomeCategory}
                            labelDescription={income.incomeDescription}
                            labelAmount={income.incomeAmount}
                            labelDate={income.incomeDate}
                            toggleModal={toggleEditIncomeForm}
                            fetchData={fetchIncomes}      
                            dataType='income'  
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-xl">No incomes available.</p>
                )}              
            </div>     
            {isEditIncomeFormOpen && (               
                <EditModal 
                    title='Income' 
                    dataType='income' 
                    fetchData={fetchIncomes} 
                    toggleModal={toggleEditIncomeForm}    
                    setIsModalOpen={setIsEditIncomeFormOpen}     
                    currentEditData={currentEditedIncome}
                />
            )}           
        </section>
    )
};

export default IncomePage;
