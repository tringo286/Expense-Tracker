import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='flex flex-col items-center h-screen'>
      <h1 className="text-4xl font-bold">Admin</h1> 
      <div className="space-y-4"> 
        <Link to="/" className="text-blue-500 hover:underline cursor-pointer text-xl block">Home</Link>         
      </div>
    </div>
  )
}

export default Admin
