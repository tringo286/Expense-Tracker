const FormButton = ({ text }) => (
    <button
      type="submit"    
      className='w-full bg-indigo-500 rounded-md py-2 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 my-4'
    >
      {text}
    </button>
  );
  
  export default FormButton;  