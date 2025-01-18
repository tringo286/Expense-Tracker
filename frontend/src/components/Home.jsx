import useDataProvider from "../hooks/useDataProvider";
import Chart from "./Chart";

const Home = () => {
    const { totalExpenses, totalIncomes, totalBalance, transactions, incomes, expenses} = useDataProvider();
  
    const maxIncome = incomes.length ? Math.max(...incomes.map(transaction => transaction.amount)) : 0;
    const minIncome = incomes.length ? Math.min(...incomes.map(transaction => transaction.amount)) : 0;

    const maxExpense = expenses.length ? Math.max(...expenses.map(transaction => transaction.amount)) : 0;
    const minExpense = expenses.length ? Math.min(...expenses.map(transaction => transaction.amount)) : 0;
    
    return (
        <section className="flex flex-col justify-center h-full">
            <div className= "flex flex-col justify-center bg-white rounded-3xl h-full p-4 my-5">
                <h1 className="flex text-3xl font-bold text-indigo-600">All Transactions</h1>             
                <div className="flex justify-center gap-4">
                    <div className="flex flex-col gap-5">
                        <div className="bg-slate-50 rounded-2xl p-4 w-140">
                            <Chart />
                        </div>
                        <div className="flex justify-around w-full">
                            <div className="flex flex-col items-center bg-slate-50 rounded-2xl drop-shadow-xl px-8 py-4">
                                <h3 className="text-xl text-gray-400 font-semibold">Total Income</h3>
                                <div className="text-3xl text-lime-500 font-bold">${totalIncomes}</div>
                            </div>
                            <div className="flex flex-col items-center bg-slate-50 rounded-2xl drop-shadow-xl px-8 py-4">
                                <h3 className="text-xl text-gray-400 font-semibold">Total Expenses</h3>
                                <div className="text-3xl text-red-500 font-bold">${totalExpenses}</div>
                            </div>
                        </div>                   
                    </div>               
                    <div className="flex flex-col justify-around w-100">
                        <div>
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-5">Recent History</h2>
                            {transactions.length > 0 ? (
                                <div className="flex flex-col justify-around h-40">
                                    {transactions.slice(0, 3).map(transaction => (
                                        <div key={transaction._id} className="flex justify-between bg-slate-50 px-4 py-2 drop-shadow-lg rounded-2xl">
                                            <div className={transaction.type === 'expense' ? 'text-red-500' : 'text-lime-500'}>
                                                {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                                            </div>
                                            <div className={transaction.type === 'expense' ? 'text-red-500' : 'text-lime-500'}>
                                                {transaction.type === 'expense' ? `-$${transaction.amount}` : `$${transaction.amount}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No transactions available.</p>
                            )}
                        </div>
                        <div className="text-indigo-600">
                            <div className="flex justify-between items-center px-4">
                                <span>Min</span>
                                <span className="text-2xl font-semibold">Salary</span>
                                <span>Max</span>
                            </div> 
                            <div className="flex justify-between bg-slate-50 drop-shadow-lg rounded-xl px-4 py-2 text-gray-600">
                                <span>${minIncome.toLocaleString()}</span>                        
                                <span>${maxIncome.toLocaleString()}</span>
                            </div> 
                        </div> 
                        <div className="text-indigo-600">
                            <div className="flex justify-between items-center px-4">
                                <span>Min</span>
                                <span className="text-2xl font-semibold">Expense</span>
                                <span>Max</span>
                            </div>
                            <div className="flex justify-between bg-slate-50 drop-shadow-lg rounded-xl px-4 py-2 text-gray-600">
                                <span>${minExpense.toLocaleString()}</span>                        
                                <span>${maxExpense.toLocaleString()}</span>
                            </div> 
                        </div>
                    </div>             
                </div> 
                <div className="flex flex-row ml-56 mt-5"> 
                    <div className="bg-slate-50 rounded-2xl drop-shadow-xl px-8 py-4">
                        <h3 className="text-gray-400 font-semibold">Total Balance</h3>
                        <div className="text-4xl text-indigo-600 font-bold">${totalBalance ? totalBalance.toLocaleString() : 0}</div>
                    </div>                
                </div>          
            </div>     
        </section>
    )
}

export default Home
