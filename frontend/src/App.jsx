import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RequireAuth from './components/RequireAuth';
import PersistLogin from "./components/PersistLogin"; 

import Header from './components/Header';
import Signup from "./components/Signup";
import Login from "./components/Login";''
import Home from './components/Home'
import Missing  from "./components/Missing";
import Admin from './components/Admin'
import Footer from './components/Footer';
import TransactionsPage from './components/TransactionsPage';
import AddIncomePage from './components/AddIncomePage';

const App = () => {
    
  const Layout = ({ children }) => (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow  '>
        {children}
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} /> 

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>                           
              <Route path="/" element={<Layout><Home /></Layout>} />    
              <Route path="/admin" element={<Layout><Admin /></Layout>} />       
              <Route path="/transactions" element={<Layout><TransactionsPage /></Layout>} />   
              <Route path="/incomes" element={<Layout><AddIncomePage /></Layout>} /> 
          </Route>
        </Route>
        
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;