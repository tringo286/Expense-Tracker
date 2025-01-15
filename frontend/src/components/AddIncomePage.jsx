import axios from '../api/axios';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const IncomesPage = () => {
    const [totalIncomes, setTotalIncomes] = useState('');
    const [incomes, setIncomes] = useState([]);  

    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');

    const fetchIncomes = async () => {
        try {
            const response = await axios.get('/incomes');
            const fetchedIncomes= response.data.data;
            setIncomes(fetchedIncomes); 
            
            const total = fetchedIncomes.reduce((total, income) => total + income.amount, 0);
            setTotalIncomes(total);                  
        } catch (error) {
            console.error("An error occurred while getting total incomes:", error.message);
        }
    };

    useEffect(() => {         
        fetchIncomes();
        setDate(new Date());
    }, []); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newIncome = {
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
        <section>
            <div>
                <h2>Incomes</h2>                
                <div>Total Incomes: ${totalIncomes ? totalIncomes.toLocaleString() : 0}</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='category' className='block'>Category</label>
                    <input 
                        type="text"
                        id='category'
                        name='category'
                        placeholder='Income Category'
                        className='border border-gray-500 rounded-sm'
                        require =''
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    

                    <label htmlFor='description' className='block'>Description</label>
                    <input 
                        type="text"
                        id='description'
                        name='description'
                        placeholder='Income Description'
                        className='border border-gray-500 rounded-sm'
                        require =''
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label htmlFor='amount' className='block'>Amount</label>
                    <input 
                        type="text"
                        id='amount'
                        name='amount'
                        placeholder='Income Amount'
                        className='border border-gray-500 rounded-sm'
                        require =''
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                        className='border-none bg-gray-400 rounded-md block text-white p-2 m-2'
                        type="submit"
                    >
                        Add Income
                    </button>
                </form> 
                <div>
            {incomes.map(income => (
                <div key={income._id} className='border border-gray-500 mb-5'> 
                    <div><strong>Category:</strong> {income.category}</div>
                    <div><strong>Description:</strong> {income.description}</div>
                    <div><strong>Amount:</strong> ${income.amount.toFixed(2)}</div>
                    <div><strong>Date:</strong> {new Date(income.date).toLocaleString()}</div>   
                    <button onClick={() => deleteIncome(income._id)}>Delete</button>        
                </div>  
                   
            ))}
        </div>            
            </div>
        </section>
    )
    }

export default IncomesPage
