import Signup from "./components/Signup";
import Login from "./components/Login";''
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home'
import Missing  from "./components/Missing";
import Admin from './components/Admin'
import PersistLogin from "./components/PersistLogin"; 

const App = () => {
    

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} /> 

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />    
              <Route path="/admin" element={<Admin />} />         
          </Route>
        </Route>
        
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;