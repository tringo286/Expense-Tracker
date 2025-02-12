const AuthInputField = ({ 
    type='text', 
    name, 
    id, 
    value='', 
    onChange,     
    placeholder='',
    error=null,
    icon=null, 
    toggleVisibility=() => {},  
    }) => (
    <div className="mb-5 w-80 relative">
      <input
        type={type}        
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className='border-b-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:rounded-sm'
        placeholder={placeholder}
        required        
      />
      {icon && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={toggleVisibility}
          role="button"
          aria-label="Toggle password visibility"
        >
          {icon}
        </span>
      )}
      {error && (
        <div className="text-red-500 bg-red-100 border border-red-500 rounded-md py-1 pl-2 mt-2">
          {error}
        </div>
      )}
    </div>
  );
  
  export default AuthInputField;  