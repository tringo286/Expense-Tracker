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
