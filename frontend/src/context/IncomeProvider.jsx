import { createContext, useState } from "react";

const IncomeContext = createContext();

const IncomeProvider = ({ children }) => {  
    const [editIncomeCategory, setEditIncomeCategory] = useState('');
    const [editIncomeDescription, setEditIncomeDescription] = useState('');
    const [editIncomeAmount, setEditIncomeAmount] = useState('');
    const [editIncomeDate, setEditIncomeDate] = useState(new Date());
    const [currentEditedIncome, setCurrentEditedIncome] = useState(null);    
    const [isEditIncomeFormOpen, setIsEditIncomeFormOpen] = useState(false);
    
    const toggleEditIncomeForm = (income) => {
        setIsEditIncomeFormOpen(!isEditIncomeFormOpen);
        if (income) {
            setCurrentEditedIncome(income); // Set the income being edited
            
            // Populate the data of current income in the input fields
            setEditIncomeCategory(income.incomeCategory);
            setEditIncomeDescription(income.incomeDescription);
            setEditIncomeAmount(income.incomeAmount);
            setEditIncomeDate(income.incomeDate);
        } else {
            setCurrentEditedIncome(null); // Clear the current income when closing
        }
    };   

    return (
        <IncomeContext.Provider value={{
            editIncomeCategory, setEditIncomeCategory,
            editIncomeDescription, setEditIncomeDescription,
            editIncomeAmount, setEditIncomeAmount,
            editIncomeDate, setEditIncomeDate,        
            currentEditedIncome, setCurrentEditedIncome,
            isEditIncomeFormOpen, toggleEditIncomeForm,       
            setIsEditIncomeFormOpen,             
        }}>
            {children}
        </IncomeContext.Provider>
    )
};

export default IncomeContext;
export { IncomeProvider };

