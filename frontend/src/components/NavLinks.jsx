import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaMoneyBillTrendUp, FaMoneyBillTransfer } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";

const NavLinks = ({ isDashBoardPage, isIncomePage, isExpensePage, isAdminPage, isAdmin }) => {
  return (
    <div className='row-span-9 flex flex-col gap-6'>
      <Link 
        to='/dashboard' 
        className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isDashBoardPage ? 'text-lg font-bold text-indigo-500' : ''}`}
      >
        <FaChartLine />
        Dashboard
      </Link>
      <Link 
        to='/incomes' 
        className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isIncomePage ? 'text-lg font-bold text-indigo-500' : ''}`}
      >
        <FaMoneyBillTrendUp />
        Incomes
      </Link>
      <Link 
        to='/expenses' 
        className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isExpensePage ? 'text-lg font-bold text-indigo-500' : ''}`}
      >
        <FaMoneyBillTransfer />
        Expenses
      </Link>
      {isAdmin && (
        <Link 
          to='/admin' 
          className={`inline-flex items-center gap-x-4 text-gray-600 font-semibold hover:text-indigo-700 ${isAdminPage ? 'text-lg font-bold text-indigo-500' : ''}`}
        >
          <RiAdminFill />
          Admin
        </Link>
      )}
    </div>
  );
}

export default NavLinks;