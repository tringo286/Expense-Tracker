import Signup from "./components/Signup";
import Login from "./components/Login";''
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home'
const App = () => {
    

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />  
        </Route>
        
      </Routes>
    </>
  );
}

export default App;