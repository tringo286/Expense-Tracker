const MinMaxAmountCard = ({ min, max, label }) => {
  return (
    <>                
      <div className="flex justify-between items-center px-3 text-indigo-500">
          <p>Min</p>
          <h3 className="text-xl font-semibold">{label}</h3>
          <p>Max</p>
      </div>
      <div className="p-3">
          <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl shadow-lg text-gray-500">
              <p>${min.toLocaleString()}</p>
              <p>${max.toLocaleString()}</p>
          </div>
      </div>                
    </>  
  );
}

export default MinMaxAmountCard;
