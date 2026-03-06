import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
  faUserCheck, 
} from '@fortawesome/free-solid-svg-icons';
const HorizontalNavbar = () => {  
  return (
    <nav className="bg-white shadow-md px-10 py-3 flex items-center justify-between">
     
      <div className="flex items-center space-x-3 ml-6">
        <div className="bg-blue-600 p-1 rounded-lg text-white">
          <FontAwesomeIcon icon={faUserCheck} size="lg" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 leading-tight">
            Library Attendance System
          </h1>
          <p className="text-xs text-indigo-500">Admin Dashboard - Manage student attendance</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800">Akriti</p>
          <p className="text-xs text-indigo-500">Administrator</p>
        </div>
        
      </div>
    </nav>
  );
};

export default HorizontalNavbar;