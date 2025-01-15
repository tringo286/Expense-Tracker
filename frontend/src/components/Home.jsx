import axios from '../api/axios';
import { useEffect, useState } from "react";

const Home = () => {     
    const [totalExpenses, setTotalExpenses] = useState('');
    const [expenses, setExpenses] = useState([]);

    const [totalIncomes, setTotalIncomes] = useState('');
    const [incomes, setIncomes] = useState([]);   

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('/expenses');
                const fetchedExpenses = response.data.data;
                setExpenses(fetchedExpenses); 
                
                const total = fetchedExpenses.reduce((total, expense) => total + expense.amount, 0);
                setTotalExpenses(total);                  
            } catch (error) {
                console.error("An error occurred while getting total expenses:", error.message);
            }
        };
        fetchExpenses();
        
        const fetchIncome = async () => {
            try {
                const response = await axios.get('/incomes');
                const fetchedIncomes= response.data.data;
                setIncomes(fetchedIncomes); 
                
                const total = fetchedIncomes.reduce((total, income) => total + income.amount, 0);
                setTotalIncomes(total);                  
            } catch (error) {
                console.error("An error occurred while getting total expenses:", error.message);
            }
        };
            
        fetchIncome();
    }, []);     

    const totalBalance = totalIncomes - totalExpenses;

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
