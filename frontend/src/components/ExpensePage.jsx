import useDataProvider from '../hooks/useDataProvider';
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";   
import { BsChatFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

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
  }  = useDataProvider();

  // Sort expenses from newest to oldest
  expenses.sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate)); 

  return (
    <section className='bg-white h-full w-full border rounded-3xl grid grid-cols-12 grid-rows-12 p-3'>           
        <div className='col-start-1 col-end-13 row-start-1 row-end-4 px-3 pt-3 flex flex-col justify-around'>
            <h1 className="flex items-center text-3xl font-semibold text-indigo-500">Expenses</h1>
            <div className='flex justify-center items-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-xl shadow-lg'>                    
                <h2 className=" text-2xl font-semibold text-indigo-500">Total Expense:</h2>
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
                        placeholder='Expense Category'
                        className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        require =''
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
                        placeholder='Expense Description'
                        className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        require =''
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
                        require =''
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                    </div>
                <div>
                    <label htmlFor='date' className='block'></label>
                    <input 
                        type="text"
                        id='date'
                        name='date' 
                        placeholder='MM/DD/YYYY'
                        className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        require =''
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
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
        <div className='col-start-5 col-end-13 row-start-4 row-end-13 flex flex-col gap-y-5 p-3'>
            {expenses.length > 0 ? (
                expenses.slice(0, 4).map(expense => (
                    <div key={expense._id} className="flex justify-between items-center p-4 text-gray-500 bg-white border border-slate-200 rounded-xl shadow-lg">
                        <div className='flex flex-col w-10/12 gap-3'>
                            <div className='flex items-center gap-2 text-red-500'>
                                <div className='text-2xl'><GoDotFill /></div>
                                <div className='text-lg font-semibold'>{expense.expenseCategory.charAt(0).toUpperCase() + expense.expenseCategory.slice(1)}</div>
                            </div>
                            <div className='grid grid-cols-8'>
                                <div className='flex items-center gap-2 col-span-3'>
                                    <div className='normal-weight'><BsChatFill /></div>
                                    <div> {expense.expenseDescription}</div>
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
                        <button onClick={() => deleteExpense(expense._id)} className="flex justify-center items-center w-10 h-10 border rounded-xl bg-indigo-500"><FaTrash  className="text-white"/></button>                             
                    </div>
                ))) : (
                    <p className="text-center text-gray-500 text-xl">No expenses available.</p>
                )              
            }
        </div>                
    </section>
)
}

export default ExpensePage
