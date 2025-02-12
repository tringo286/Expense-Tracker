const HistoryCard = ({ transaction }) => {
  return (
    <div key={transaction.id} className="flex justify-between px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl shadow-lg">
      <div className={transaction.type === 'expense' ? 'text-red-500' : 'text-lime-500'}>
        {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
      </div>
      <div className={transaction.type === 'expense' ? 'text-red-500' : 'text-lime-500'}>
        {transaction.type === 'expense' ? `-$${transaction.amount}` : `$${transaction.amount}`}
      </div>
    </div>
  );
}
    
export default HistoryCard;
