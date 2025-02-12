import { ToastContainer } from 'react-toastify';
import { DataProvider } from '../context/DataProvider';
import SideBar from './SideBar';

const Layout = ({ children }) => {
  return (
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
};

export default Layout;
