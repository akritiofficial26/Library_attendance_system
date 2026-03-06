import React from 'react';

const StatCard = ({ title, value, icon, iconColor, bgColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start w-full">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <i className={`fa-solid ${icon} ${iconColor} text-xl`}></i>
      </div>
    </div>
  );
};

const Cards = () => {
  const stats = [
    {
      title: "Total Visits Today",
      value: "5",
      icon: "fa-users",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Currently Present",
      value: "2",
      icon: "fa-user-check",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avg. Hours/Student",
      value: "4.3h",
      icon: "fa-clock",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Hours Today",
      value: "12.8h",
      icon: "fa-arrow-trend-up",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Top Library User",
      value: "7.5h",
      icon: "fa-trophy",
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Cards;