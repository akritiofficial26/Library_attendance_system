import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faUser } from "@fortawesome/free-solid-svg-icons";

const Attendance = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 ">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 text-indigo-700">
            <FontAwesomeIcon icon={faExpand} className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Scan Student ID
            </h2>
            <p className="text-indigo-500">
              Enter or scan student ID card to manage attendance
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FontAwesomeIcon
                icon={faUser}
                className="text-slate-400 text-lg"
              />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-12 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg text-slate-700 placeholder-slate-400"
              placeholder="Enter Student ID"
            />
          </div>
          <button className="flex items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all whitespace-nowrap">
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
