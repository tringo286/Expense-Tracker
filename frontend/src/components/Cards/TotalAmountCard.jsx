const TotalAmountCard = ({ title, value, amountColor, isPrimary }) => {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-xl shadow-lg h-full flex flex-col justify-center items-center sm:p-2">
        <h3 className={`${isPrimary ? 'text-sm sm:text-xl lg:text-2xl' : 'text-sm sm:text-lg lg:text-xl'} font-semibold text-gray-500`}>{title}</h3>
        <p className={`font-semibold ${amountColor} ${isPrimary ? 'text-sm sm:text-2xl lg:text-4xl' : 'text-sm sm:text-xl lg:text-3xl'}`}>
          {`$${value}`}
        </p>
      </div>
    );
  }
  
  export default TotalAmountCard;  