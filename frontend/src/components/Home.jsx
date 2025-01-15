import useDataProvider from "../hooks/useDataProvider";
import Chart from "./Chart";

const Home = () => {
    const { totalExpenses, totalIncomes, totalBalance, transactions, incomes, expenses} = useDataProvider();
  
    const maxIncome = Math.max(...incomes.map(transaction => transaction.amount));
    const minIncome = Math.min(...incomes.map(transaction => transaction.amount));
  
    const maxExpense = Math.max(...expenses.map(transaction => transaction.amount));
    const minExpense = Math.min(...expenses.map(transaction => transaction.amount));
    
    return (
        <section className="grid grid-rows-[40px,1fr, 50px] bg-gray-100 h-full">
            <h1 className="text-3xl text-indigo-500 font-bold ml-3">All Transactions</h1>             
            <div className="grid grid-cols-[1fr,450px]">
                <div className="grid grid-cols-2 grid-rows-[300px, 50px]">
                    <div className="col-span-2 border-none bg-white rounded-xl m-3"><Chart /></div>

                    <div className="flex flex-col justify-center items-center border-none bg-white rounded-2xl m-3">
                        <h3 >Total Incomes</h3>
                        <div className="text-2xl text-lime-500">${totalIncomes ? totalIncomes.toLocaleString() : 0}</div>
                    </div>

                    <div className="flex flex-col justify-center items-center border-none bg-white rounded-2xl m-3">
                        <h3>Total Expenses</h3>   
                        <div className="text-2xl text-red-500">${totalExpenses ? totalExpenses.toLocaleString() : 0}</div>
                    </div>                    
                </div> 

                
                <div className="flex flex-col justify-between mx-3">
                    <div className="mt-3">
                        <h2 className="mb-3 text-2xl text-indigo-500 font-bold">Recent History</h2>
                        <div>
                            {transactions.slice(0,3).map(transaction => (
                                <div key={transaction._id} className="flex flex-row justify-between bg-white my-2 rounded-xl p-3">
                                    <div className={transaction.type === 'expense' ? 'text-red-500' : 'text-lime-500'}>
                                        {transaction.category}
                                    </div>
                                    <div className={transaction.type === 'expense' ? 'text-red-500' : 'text-lime-500'}>
                                        {transaction.amount}
                                    </div>
                                </div>  
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span>Min</span>
                            <span className="text-2xl text-indigo-500 font-bold">Salary</span>
                            <span>Max</span>
                        </div> 

                        <div className="flex justify-between bg-white rounded-xl p-3">
                            <span className="text-gray-500 text-xl">${minIncome.toLocaleString()}</span>                        
                            <span className="text-gray-500 text-xl">${maxIncome.toLocaleString()}</span>
                        </div> 
                    </div> 

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span>Min</span>
                            <span className="text-2xl text-indigo-500 font-bold">Expense</span>
                            <span>Max</span>
                        </div>

                        <div className="flex justify-between bg-white rounded-xl p-3">
                            <span className="text-gray-500 text-xl">${minExpense.toLocaleString()}</span>                        
                            <span className="text-gray-500 text-xl">${maxExpense.toLocaleString()}</span>
                        </div> 
                    </div>
                </div>
            </div> 
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-40 h-20 bg-white rounded-xl mb-3">
                    <h3>Total Balance</h3>
                    <div className="text-3xl text-blue-500">${totalBalance ? totalBalance.toLocaleString() : 0}</div>
                </div>
            </div>   
        </section>
    )
}

export default Home
