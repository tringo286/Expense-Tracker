import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (form) => {
    setCurrentForm(form);
  };

  return (
    <>
      {currentForm === 'login' ? (
        <Login onSwitch={toggleForm} />
      ) : (
        <Signup onSwitch={toggleForm} />
      )}        
    </>
  );
}

export default App;