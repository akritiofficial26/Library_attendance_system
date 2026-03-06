import React, { useState } from 'react'
import HorizontalNavbar from './HorizontalNavBar'
import Sidebar from './SideBar'
import Cards from './Cards'

const Dashboard = () => {

  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      
      <HorizontalNavbar />

      <div className="flex flex-1 overflow-hidden">
        
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Cards/>
        </div>

      </div>

    </div>
  );
}

export default Dashboard