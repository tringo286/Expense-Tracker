const TotalAmountCard = ({ title, value, amountColor, isPrimary }) => {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-xl shadow-lg h-full flex flex-col justify-center items-center">
        <h3 className={`${isPrimary ? 'text-2xl' : 'text-xl'} font-semibold text-gray-500`}>{title}</h3>
        <p className={`font-semibold ${amountColor} ${isPrimary ? 'text-4xl' : 'text-3xl'}`}>
          {`$${value}`}
        </p>
      </div>
    );
  }
  
  export default TotalAmountCard;  