import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth';
import PersistLogin from "./components/PersistLogin" 
import Signup from "./pages/Signup";
import Login from "./pages/Login";''
import Dashboard from './pages/DashboardPage'
import MissingPage  from "./pages/MissingPage";
import AdminPage from './pages/AdminPage'
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import RequireAdmin from './components/RequireAdmin';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';

const App = () => {      
  return (    
      <Routes>
        {/* Public Routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} /> 

         {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>                           
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />   
              <Route element={<RequireAdmin />}>  
                <Route path="/admin" element={<Layout><AdminPage /></Layout>} /> 
              </Route>
              <Route path="/incomes" element={<Layout><IncomePage /></Layout>} />
              <Route path="/expenses" element={<Layout><ExpensePage /></Layout>} /> 
          </Route>
        </Route>
        
        {/* Other Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/unauthorized" element={<MissingPage />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>    
  );
}

export default App;