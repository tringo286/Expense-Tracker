import useDataProvider from "../hooks/useDataProvider";

const Home = () => {
    const { totalExpenses, totalIncomes, totalBalance } = useDataProvider();

    return (
        <section className="grid grid-cols-5">
            <div className='col-span-3 grid grid-cols-2 grid-rows-3'>
                <div className='col-span-2'>
                    <h1 className="text-3xl font-bold">All Transactions</h1>
                    <div>Chart Component</div>
                </div> 
                <div>
                    <h3>Total Incomes</h3>
                    <div>${totalIncomes ? totalIncomes.toLocaleString() : 0}</div>
                </div>

                <div>
                    <h3>Total Expenses</h3>   
                    <div>${totalExpenses ? totalExpenses.toLocaleString() : 0}</div>
                </div>   
                <div className="col-span-2">
                    <h3>Total Balance</h3>
                    <div>${totalBalance ? totalBalance.toLocaleString() : 0}</div>
                </div> 
            </div>   

            <div className='col-span-2 grid-rows-6'>
                <h2>Recent History</h2>
                <div>
                    History Component
                </div>
                <div className='grid grid-cols-3'>
                    <span>Min</span>
                    <h2>Salary</h2>
                    <span>Max</span>
                </div>   
                <div>
                    Salary Component
                </div>
                <div className='grid grid-cols-3'>
                    <span>Min</span>
                    <h2>Expense</h2>
                    <span>Max</span>
                </div>
                <div>
                    Expense Component
                </div>
            </div>                                  
        </section>
    )
}

export default Home
