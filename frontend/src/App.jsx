import Signup from "./components/Signup";
import Login from "./components/Login";''
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home'
import LinkPage from "./components/LinkPage";

const App = () => {
    

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/linkpage' element={<LinkPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />  
        </Route>
        
      </Routes>
    </>
  );
}

export default App;