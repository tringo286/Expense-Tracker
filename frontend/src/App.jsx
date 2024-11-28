import Signup from "./components/Signup";
import Login from "./components/Login";''
import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom';
import HomePage from './components/HomePage'

const App = () => {
    const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </>            
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;