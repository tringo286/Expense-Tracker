import useDataProvider from "../hooks/useDataProvider";
import Chart from "../components/Chart";
import TotalAmountCard from "../components/TotalAmountCard";
import MinMaxAmountCard from "../components/MinMaxAmountCard"
import HistoryCard from "../components/HistoryCard";

const Dashboard = () => {
    const { totalExpenses, totalIncomes, totalBalance, transactions, incomes, expenses} = useDataProvider();
  
    const maxIncome = incomes.length ? Math.max(...incomes.map(income => income.incomeAmount)) : 0;
    const minIncome = incomes.length ? Math.min(...incomes.map(income => income.incomeAmount)) : 0;

    const maxExpense = expenses.length ? Math.max(...expenses.map(expense => expense.expenseAmount)) : 0;
    const minExpense = expenses.length ? Math.min(...expenses.map(expense => expense.expenseAmount)) : 0;  

    // Sort transactions from newest to oldest
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return (
        <section className="bg-white h-full w-full border rounded-3xl grid grid-cols-12 grid-rows-12 p-3">
            <h1 className="col-start-1 col-end-8 row-start-1 row-end-2 flex items-center p-3 text-2xl font-semibold text-indigo-500">All Transactions</h1> 
            <div className="col-start-1 col-end-8 row-start-2 row-end-8 p-3">
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl shadow-lg"><Chart /></div>
            </div>
            <div className="col-start-1 col-end-4 row-start-8 row-end-10 p-3">
                <TotalAmountCard 
                    title="Total Income"
                    value={totalIncomes}                
                    amountColor="text-lime-500"
                />                                       
            </div>
            <div className="col-start-5 col-end-8 row-start-8 row-end-10 p-3">
                <TotalAmountCard 
                    title="Total Expense"
                    value={totalExpenses}                
                    amountColor="text-red-500"
                />                                       
            </div>
            <div className="col-start-3 col-end-6 row-start-10 row-end-13 p-6">
                <TotalAmountCard 
                    title="Total Balance"
                    value={totalBalance}     
                    isPrimary={true}           
                    amountColor="text-indigo-500"
                />                                       
            </div>  
            <h3 className="col-start-8 col-end-13 row-start-2 row-end-3 flex justify-center items-center text-xl font-semibold text-indigo-500 ">Recent History</h3>

            <div className="col-start-8 col-end-13 row-start-3 row-end-7 flex flex-col gap-y-5 p-3">
                {transactions.length > 0 ? (
                transactions.slice(0, 3).map(transaction => (
                    <HistoryCard key={transaction.id} transaction={transaction} />
                ))
                ) : (
                <p className="text-center text-gray-500 text-lg">No transactions available.</p>
                )}
            </div>
            <div className="col-start-8 col-end-13 row-start-7 row-end-9 flex flex-col justify-around">                
                <MinMaxAmountCard
                    min={minIncome}
                    max={maxIncome}
                    label="Income"            
                />                   
            </div>
            <div className="col-start-8 col-end-13 row-start-9 row-end-11 flex flex-col justify-around "> 
                <MinMaxAmountCard
                    min={minExpense}
                    max={maxExpense}
                    label="Expense"            
                />    
            </div>                  
        </section>
    )
}

export default Dashboard;