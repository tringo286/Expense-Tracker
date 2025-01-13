import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      Admin 
      <div className="space-y-4"> 
        <Link to="/" className="text-blue-500 hover:underline cursor-pointer text-xl block">Home</Link>         
      </div>
    </div>
  )
}

export default Admin
