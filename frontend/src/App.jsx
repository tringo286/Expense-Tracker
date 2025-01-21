import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RequireAuth from './components/RequireAuth';
import PersistLogin from "./components/PersistLogin"; 
import { DataProvider } from './context/DataProvider';

import Header from './components/Header';
import Signup from "./components/Signup";
import Login from "./components/Login";''
import Dashboard from './components/Dashboard'
import Missing  from "./components/Missing";
import Admin from './components/Admin'
import IncomePage from './components/IncomePage';
import ExpensePage from './components/ExpensePage';

const App = () => {
    
  const Layout = ({ children }) => (
    <div className='grid grid-cols-12 h-screen' style={{ backgroundImage: 'url(/bg.png)'}}>
      <DataProvider>
        <Header />
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
              <Route path="/" element={<Layout><Dashboard /></Layout>} />    
              <Route path="/admin" element={<Layout><Admin /></Layout>} />     
              <Route path="/incomes" element={<Layout><IncomePage /></Layout>} />
              <Route path="/expenses" element={<Layout><ExpensePage /></Layout>} /> 
          </Route>
        </Route>
        
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;