import axios from '../api/axios';
import { useEffect, useState } from "react";

const TransactionsPage = () => {
    const [totalExpenses, setTotalExpenses] = useState('');
    const [expenses, setExpenses] = useState([]);

    const [totalIncomes, setTotalIncomes] = useState('');
    const [incomes, setIncomes] = useState([]); 

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
            const fetchTransactions  = async () => {
                try {
                    // Fetch expenses
                    const expensesResponse = await axios.get('/expenses');
                    const fetchedExpenses = expensesResponse.data.data;

                    // Fetch incomes
                    const incomesResponse = await axios.get('/incomes');
                    const fetchedIncomes = incomesResponse.data.data; 
                    
                    // Combine expenses and incomes
                    const combinedTransactions = [
                        ...fetchedExpenses.map(transaction => ({ ...transaction, type: 'expense' })),
                        ...fetchedIncomes.map(transaction => ({ ...transaction, type: 'income' }))
                    ];

                    // Set combined transactions to state
                    setTransactions(combinedTransactions);
                                     
                } catch (error) {
                    console.error("An error occurred while fetching transactions:", error.message);
                }
            };        

            fetchTransactions();      
        }, []); 

    return (
        <div>
            {transactions.map(transaction => (
                <div key={transaction._id} className='border border-gray-500 mb-5'> 
                    <div><strong>Category:</strong> {transaction.category}</div>
                    <div><strong>Description:</strong> {transaction.description}</div>
                    <div><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</div>
                    <div><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</div>
                    <div><strong>Type:</strong> {transaction.type}</div>
                </div>     
            ))}
        </div>
    );
};

export default TransactionsPage;
