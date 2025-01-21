import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom";


const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState('');
    const [incomes, setIncomes] = useState([]); 
    const [totalIncomes, setTotalIncomes] = useState('');
    const [transactions, setTransactions] = useState([]);

    const [incomeCategory, setIncomeCategory] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [incomeDate, setIncomeDate] = useState('');
    const [incomeAmount, setIncomeAmount] = useState(''); 

    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(''); 
    
    const totalBalance = totalIncomes - totalExpenses    
        
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUserId = user.userId;

    const location = useLocation();
    
    useEffect(() => {        
        fetchExpenses(currentUserId);  
        fetchIncomes(currentUserId);         
    }, [location]);     
    
    useEffect(() => {        
        handleTotalExpense();
        handleTotalIncome(); 
        getAllTransactions();         
    }, [expenses, incomes]);    

    const fetchExpenses = async (currentUserId) => {
        try {
            const response = await axios.get('/expenses', {
                params: { currentUserId }
            });
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

    const handleIncomeSubmit = (e) => {
        e.preventDefault();
        
        const newIncome = {
            userId: currentUserId,
            incomeCategory,
            incomeDescription,
            incomeAmount,
            incomeDate,
        };
        addIncome(newIncome);
        setIncomeCategory('');
        setIncomeDescription('');
        setIncomeAmount('');
        setIncomeDate('');
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
            toast.success('Expesne Deleted Successfully')             
        } catch (error) {            
            console.error("There was an error deleting the expense", error);
        }
    };

    return (
        <DataContext.Provider value={{
            totalExpenses, totalIncomes, totalBalance, transactions,

            incomeCategory, setIncomeCategory, incomeDescription, setIncomeDescription, incomeDate, setIncomeDate, 
            incomeAmount, setIncomeAmount, handleIncomeSubmit, deleteIncome, 

            expenseCategory, setExpenseCategory, expenseDescription, setExpenseDescription, expenseDate, setExpenseDate,
            expenseAmount, setExpenseAmount, handleExpenseSubmit, deleteExpense,
            
            incomes, expenses
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
export { DataProvider };
