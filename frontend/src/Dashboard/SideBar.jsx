import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine,  
  faClock,   
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/Login');
  };

  // Helper function for consistent button styling
  const getButtonClass = (tabName) => {
    const baseClass = "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200";
    return selectedTab === tabName
      ? `${baseClass} bg-white-500 text-white shadow-lg`
      : `${baseClass} text-gray-400 hover:bg-white/10 hover:text-white`;
  };

  return (
    <div className="w-16 bg-[#351aa2] border-r flex flex-col items-center py-6 justify-between h-full">
      <div className="flex flex-col gap-6">
        
        <button
          onClick={() => setSelectedTab("dashboard")}
          title="Dashboard"
          className={getButtonClass("dashboard")}
        >
          <FontAwesomeIcon icon={faChartLine} />
        </button>

        <button
          onClick={() => setSelectedTab("performance")}
          title="Performance"
          className={getButtonClass("performance")}
        >
          <FontAwesomeIcon icon={faClock} />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        
        <button
          onClick={handleLogout}
          title="Logout"
          className="w-12 h-12 text-gray-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;