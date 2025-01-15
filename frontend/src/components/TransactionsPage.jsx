import useDataProvider from '../hooks/useDataProvider';

const TransactionsPage = () => {   
    const { transactions } = useDataProvider();
    
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
