import axios from '../api/axios';
import { useEffect, useState } from "react";

const Home = () => {     
    const [totalExpenses, setTotalExpenses] = useState('');
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('/expense');
                const fetchedExpenses = response.data.data;
                setExpenses(fetchedExpenses); 
                
                const total = fetchedExpenses.reduce((total, expense) => total + expense.amount, 0);
                setTotalExpenses(total);                  
            } catch (error) {
                console.error("An error occurred while getting total expenses:", error.message);
            }
        };
        fetchExpenses();    
    }, []);     

    return (
        <section className="grid grid-cols-5">
            <div className='col-span-3 grid grid-cols-2 grid-rows-3'>
                <div className='col-span-2'>
                    <h1 className="text-3xl font-bold">All Transactions</h1>
                    <div>Chart Component</div>
                </div> 
                <div>Total Income</div> 
                <div>
                    <h3>Total Expenses</h3>   
                    <div>{totalExpenses ? totalExpenses : 0}</div>
                </div>   
                <div className="col-span-2">Total Balance</div>  
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
