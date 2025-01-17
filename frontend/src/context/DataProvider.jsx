import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from 'react-toastify'

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState('');
    const [incomes, setIncomes] = useState([]); 
    const [totalIncomes, setTotalIncomes] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');     
    
    const totalBalance = totalIncomes - totalExpenses    
        
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUserId = user.userId;
    
    useEffect(() => {        
        fetchExpenses();  
        fetchIncomes(currentUserId); 
                    
    }, []);     
    
    useEffect(() => {        
        handleTotalExpense();
        handleTotalIncome(); 
        getAllTransactions();  
    }, [expenses, incomes]);    

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('/expenses');
            const fetchedExpenses = response.data.data;
            setExpenses(fetchedExpenses);            
        } catch (error) {
            console.error("An error occurred while getting total expenses:", error.message);
        }
    };  

    const fetchIncomes = async (currentUserId) => {
        try {            
            const response = await axios.get('/incomes', {
                params: { currentUserId }
            });
            const fetchedIncomes = response.data.data;             
            setIncomes(fetchedIncomes); 
        } catch (error) {
            console.error("An error occurred while getting incomes:", error.message);
        }
    };    

    const handleTotalExpense = () => {
        const total = expenses.reduce((total, expense) => total + expense.amount, 0);
        setTotalExpenses(total);
    };

    const handleTotalIncome = () => {
        const total = incomes.reduce((total, income) => total + income.amount, 0);
        setTotalIncomes(total);
    };

    const getAllTransactions = () => {
        const combinedTransactions = [
            ...expenses.map(transaction => ({ ...transaction, type: 'expense' })),
            ...incomes.map(transaction => ({ ...transaction, type: 'income' }))
        ];   
                
        const sortedTransactions = combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
        setTransactions(sortedTransactions);
    };    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newIncome = {
            userId: currentUserId,
            category,
            description,
            amount,
            date,
        };
        addIncome(newIncome);
        toast.success('Income Added Successfully')
    };

    const addIncome = async (income) => {
        try {
            await axios.post('/income', income);
            fetchIncomes();              
        } catch (error) {            
            console.error("There was an error adding the income", error);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`/income/${id}`); 
            fetchIncomes();   
            toast.success('Income Deleted Successfully')             
        } catch (error) {            
            console.error("There was an error deleting the income", error);
        }
    };

    return (
        <DataContext.Provider value={{
            totalExpenses, totalIncomes, totalBalance,
            transactions,
            category, setCategory, description, setDescription, date, setDate, amount, setAmount, handleSubmit, addIncome, deleteIncome, 
            incomes, expenses
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
export { DataProvider };
