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
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');     
    
    const [editCategory, setEditCategory] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editDate, setEditDate] = useState(new Date());

    const [loading, setLoading] = useState(false);
        
    const totalBalance = totalIncomes - totalExpenses    
        
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUserId = user.userId; 
    
    useEffect(() => {        
        fetchExpenses(currentUserId);  
        fetchIncomes(currentUserId);                    
    }, []);     
    
    useEffect(() => {        
        handleTotalExpense();
        handleTotalIncome(); 
        getAllTransactions();         
    }, [expenses, incomes]);    

    const fetchExpenses = async (currentUserId) => {
        setLoading(true);
        try {
            const response = await axios.get('/expenses', {
                params: { currentUserId }
            });
            const fetchedExpenses = response.data.data;            
            setExpenses(fetchedExpenses);     
            setLoading(false);         
        } catch (error) {
            setLoading(false);  
            console.error("An error occurred while getting total expenses:", error.message);
        }
    };  

    const fetchIncomes = async (currentUserId) => {
        setLoading(true);
        try {            
            const response = await axios.get('/incomes', {
                params: { currentUserId }
            });
            const fetchedIncomes = response.data.data;                       
            setIncomes(fetchedIncomes); 
            setLoading(false);  
        } catch (error) {
            setLoading(false);      
            console.error("An error occurred while getting incomes:", error.message);
        }
    };    
    
    const handleTotalExpense = () => {
        const total = expenses.reduce((total, expense) => total + expense.expenseAmount, 0);
        setTotalExpenses(total);
    };

    const handleTotalIncome = () => {
        const total = incomes.reduce((total, income) => total + income.incomeAmount, 0);
        setTotalIncomes(total);
    };

    const getAllTransactions = () => {
        const combinedTransactions = [
            ...expenses.map(expense => ({
                id: expense._id,
                category: expense.expenseCategory, 
                description: expense.expenseDescription,
                amount: expense.expenseAmount,
                date: expense.expenseDate,
                type: 'expense' 
            })),
            ...incomes.map(income => ({ 
                id: income._id,
                category: income.incomeCategory, 
                description: income.incomeDescription,
                amount: income.incomeAmount,
                date: income.incomeDate,
                type: 'income' 
            }))
        ];         
        setTransactions(combinedTransactions);
    };        

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        
        const newExpense = {
            userId: currentUserId,
            expenseCategory,
            expenseDescription,
            expenseAmount,
            expenseDate,
        };
        addExpense(newExpense);
        setExpenseCategory('');
        setExpenseDescription('');
        setExpenseAmount('');
        setExpenseDate('');
        toast.success('Expense Added Successfully')
    };

    const addExpense = async (expense) => {
        try {
            await axios.post('/expense', expense);
            fetchExpenses();              
        } catch (error) {            
            console.error("There was an error adding the expense", error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`/expense/${id}`); 
            fetchExpenses();   
            toast.success('Expense Deleted Successfully')             
        } catch (error) {            
            console.error("There was an error deleting the expense", error);
        }
    };

    return (
        <DataContext.Provider value={{
            totalExpenses, totalBalance, transactions,  

            expenseCategory, setExpenseCategory, expenseDescription, setExpenseDescription, expenseDate, setExpenseDate,
            expenseAmount, setExpenseAmount, handleExpenseSubmit, deleteExpense,            

            incomes, setIncomes, totalIncomes, setTotalIncomes,
            expenses, fetchIncomes, fetchExpenses,
            editCategory, setEditCategory,
            editDescription, setEditDescription,
            editAmount, setEditAmount,
            editDate, setEditDate,
            loading, setLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
export { DataProvider };
