import { FaDollarSign, FaCalendar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { BsChatFill } from "react-icons/bs";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const TransactionCard = ({ label, labelCategory, labelDescription, labelAmount, labelDate }) => {
    return (
      <div className="flex justify-between items-center p-4 text-gray-500 bg-white border border-slate-200 rounded-xl shadow-lg">
        <div className='flex flex-col w-10/12 gap-3'>
            <div className='flex items-center gap-2 text-lime-500'>
                <div className='text-2xl'><GoDotFill /></div>
                <div className='text-lg font-semibold'>{labelCategory.charAt(0).toUpperCase() + labelCategory.slice(1)}</div>
            </div>
            <div className='grid grid-cols-8'>                                    
                    <div className='col-span-3'>
                        {labelDescription && (
                            <div className='flex items-center gap-2 '>
                                <div className='normal-weight'><BsChatFill /></div>
                                <div> {labelDescription}</div>
                            </div>
                        )}  
                    </div>                                                                      
                <div className='flex items-center col-span-2'>
                    <div><FaDollarSign /></div>
                    <div>{labelAmount}</div>
                </div>
                <div className='flex items-center gap-2 col-span-3'>
                    <FaCalendar />
                    <div>Date: {new Date(labelDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',   
                        day: 'numeric'  
                        })}
                    </div>                        
                </div>              
            </div>
        </div>        
        <EditButton label={label} />
        <DeleteButton label={label} />                                
    </div>
    );
  }
  
  export default TransactionCard;  