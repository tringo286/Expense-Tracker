import useDataProvider from '../hooks/useDataProvider';
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";   
import { BsChatFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const IncomePage = () => {
    const { 
        totalIncomes,
        incomeCategory, 
        setIncomeCategory, 
        incomeDescription,
        setIncomeDescription, 
        incomeDate, 
        setIncomeDate, 
        incomeAmount, 
        setIncomeAmount, 
        handleIncomeSubmit, 
        deleteIncome, 
        incomes 
    } = useDataProvider();  
    
    // Sort incomes from newest to oldest
    incomes.sort((a, b) => new Date(b.incomeDate) - new Date(a.incomeDate)); 
    
    return (
        <section className='bg-white h-full w-full border rounded-3xl grid grid-cols-12 grid-rows-12 p-3'>           
            <div className='col-start-1 col-end-13 row-start-1 row-end-4 px-3 pt-3 flex flex-col justify-around'>
                <h1 className="flex items-center text-3xl font-semibold text-indigo-500">Incomes</h1>
                <div className='flex justify-center items-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-xl shadow-lg'>                    
                    <h2 className=" text-2xl font-semibold text-indigo-500">Total Income:</h2>
                    <p className='text-lime-500 text-3xl font-semibold'>${totalIncomes}</p>
                </div>
            </div>
            <div className='col-start-1 col-end-5 row-start-4 row-end-11'>
                <form onSubmit={handleIncomeSubmit} className='flex flex-col gap-6 h-full p-3'>
                    <div>
                        <label htmlFor='category' className='block'></label>
                        <input 
                            type="text"
                            id='category'
                            name='category'
                            placeholder='Income Category'
                            className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            required
                            value={incomeCategory}
                            onChange={(e) => setIncomeCategory(e.target.value)}
                            
                        />
                    </div>
                    <div>
                        <label htmlFor='description' className='block'></label>
                        <input 
                            type="text"
                            id='description'
                            name='description'
                            placeholder='Income Description'
                            className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            required
                            value={incomeDescription}
                            onChange={(e) => setIncomeDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='amount' className='block'></label>
                        <input 
                            type="text"
                            id='amount'
                            name='amount'
                            placeholder='Income Amount'
                            className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            required
                            value={incomeAmount}
                            onChange={(e) => setIncomeAmount(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <DatePicker
                            selected={incomeDate}
                            onChange={(date) => setIncomeDate(date)}
                            className="bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full block focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            wrapperClassName="datepicker-wrapper w-full"  // Apply custom class to the outer wrapper
                            placeholderText="Enter a Date"
                            dateFormat="MM/dd/yyyy"
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
            <div className='col-start-5 col-end-13 row-start-4 row-end-13 flex flex-col gap-y-5 p-3'>
                {incomes.length > 0 ? (
                    incomes.slice(0, 4).map(income => (
                        <div key={income._id} className="flex justify-between items-center p-4 text-gray-500 bg-white border border-slate-200 rounded-xl shadow-lg">
                            <div className='flex flex-col w-10/12 gap-3'>
                                <div className='flex items-center gap-2 text-lime-500'>
                                    <div className='text-2xl'><GoDotFill /></div>
                                    <div className='text-lg font-semibold'>{income.incomeCategory.charAt(0).toUpperCase() + income.incomeCategory.slice(1)}</div>
                                </div>
                                <div className='grid grid-cols-8'>
                                    <div className='flex items-center gap-2 col-span-3'>
                                        <div className='normal-weight'><BsChatFill /></div>
                                        <div> {income.incomeDescription}</div>
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
                            <button onClick={() => deleteIncome(income._id)} className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><FaTrash  className="text-white"/></button>                             
                        </div>
                    ))) : (
                        <p className="text-center text-gray-500 text-xl">No incomes available.</p>
                    )              
                }
            </div>                
        </section>
    )
}

export default IncomePage
