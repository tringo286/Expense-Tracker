import { ToastContainer } from 'react-toastify';
import { DataProvider } from '../context/DataProvider';
import SideBar from './SideBar';

const Layout = ({ children }) => {
  return (
    <div className='grid grid-cols-12 grid-rows-12 h-screen' style={{ backgroundImage: 'url(/bg.png)'}}>
      <DataProvider>
        <SideBar />
        <main className='col-span-full row-span-10 lg:col-span-9 lg:row-span-full px-4 lg:px-0 pb-4 lg:py-10 lg:pr-10'>
          {children}
          <ToastContainer />
        </main>            
      </DataProvider>
    </div>
  );
};

export default Layout;
