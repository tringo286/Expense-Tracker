import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RequireAuth from './components/RequireAuth';
import PersistLogin from "./components/PersistLogin"; 
import { DataProvider } from './context/DataProvider';

import SideBar from './components/SideBar';
import Signup from "./components/Signup";
import Login from "./components/Login";''
import Dashboard from './components/Dashboard'
import Missing  from "./components/Missing";
import Admin from './components/Admin'
import IncomePage from './components/IncomePage';
import ExpensePage from './components/ExpensePage';
import Unauthorized from './components/Unauthorized'
import RequireAdmin from './components/RequireAdmin';
import LandingPage from './components/LandingPage';

const App = () => {
    
  const Layout = ({ children }) => (
    <div className='grid grid-cols-12 h-screen' style={{ backgroundImage: 'url(/bg.png)'}}>
      <DataProvider>
        <SideBar />
        <main className='col-span-9 py-10 pr-10'>
          {children}
          <ToastContainer />
        </main>            
      </DataProvider>
    </div>
  );

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} /> 

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>                           
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />   
              <Route element={<RequireAdmin />}>  
                <Route path="/admin" element={<Layout><Admin /></Layout>} /> 
              </Route>
              <Route path="/incomes" element={<Layout><IncomePage /></Layout>} />
              <Route path="/expenses" element={<Layout><ExpensePage /></Layout>} /> 
          </Route>
        </Route>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/unauthorized" element={<Missing />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;