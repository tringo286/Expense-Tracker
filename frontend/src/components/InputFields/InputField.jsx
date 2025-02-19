
const InputField = ({
    type='text', 
    name,     
    value='', 
    onChange,     
    placeholder='',
    className='bg-slate-50 border border-slate-100 rounded-xl shadow-lg px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500',
    required= true,
    error=null, 
    }) =>   (
    <>
        <label htmlFor={name}></label>        
        <input 
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className={className}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}                             
        />
        {error && (
        <div className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mt-2">
          {error}
        </div>
      )}
    </>
  );

export default InputField;
