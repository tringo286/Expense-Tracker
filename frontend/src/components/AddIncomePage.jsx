import useDataProvider from '../hooks/useDataProvider';

const IncomesPage = () => {
    const { totalIncomes, category, setCategory, description, setDescription, date, setDate, amount, setAmount, handleSubmit, addIncome, deleteIncome, incomes } = useDataProvider();
    
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

                    <label htmlFor='date' className='block'>Date</label>
                    <input 
                        type="text"
                        id='date'
                        name='date' 
                        placeholder='MM/DD/YYYY'
                        className='border border-gray-500 rounded-sm'
                        require =''
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                        <div><strong>Date:</strong> {new Date(income.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'  
                            })}
                        </div>
                        <button onClick={() => deleteIncome(income._id)}>Delete</button>        
                    </div>                     
            ))}
        </div>            
            </div>
        </section>
    )
    }

export default IncomesPage
