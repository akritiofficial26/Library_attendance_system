import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faCircleCheck, 
  faCircleExclamation, 
  faChevronLeft, 
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

const Performance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const allRecords = [
    { id: 'STU001', name: 'Emma Johnson', dept: 'Computer Science', checkIn: '09:15 AM', checkOut: '01:45 PM', hours: '4h 30m', status: 'Checked Out' },
    { id: 'STU002', name: 'Liam Smith', dept: 'Engineering', checkIn: '10:30 AM', checkOut: '02:15 PM', hours: '3h 45m', status: 'Checked Out' },
    { id: 'STU003', name: 'Olivia Brown', dept: 'Mathematics', checkIn: '08:00 AM', checkOut: '12:30 PM', hours: '4h 30m', status: 'Checked Out' },
    { id: 'STU004', name: 'Noah Davis', dept: 'Physics', checkIn: '11:00 AM', checkOut: '-', hours: '-', status: 'Checked In' },
    { id: 'STU005', name: 'Ava Wilson', dept: 'Chemistry', checkIn: '01:30 PM', checkOut: '-', hours: '-', status: 'Checked In' },
    { id: 'STU006', name: 'Lucas Geller', dept: 'Biology', checkIn: '08:45 AM', checkOut: '01:00 PM', hours: '4h 15m', status: 'Checked Out' },
  ];

  const totalPages = Math.ceil(allRecords.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = allRecords.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-xl shadow-sm border  border-gray-100 flex flex-col min-h-[600px]">

        <div className="p-6 py-3 border-b bg-[#351aa2] rounded-xl border-gray-100">
          <h2 className="text-xl font-bold text-white tracking-tight">Today's Attendance Records</h2>
          <p className="text-sm text-white mt-1">All check-in and check-out records for today</p>
        </div>

        <div className="flex-grow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-5 font-semibold">Student</th>
                <th className="px-6 py-5 font-semibold">Department</th>
                <th className="px-6 py-5 font-semibold">Check-in Time</th>
                <th className="px-6 py-5 font-semibold">Check-out Time</th>
                <th className="px-6 py-5 font-semibold">Hours Spent</th>
                <th className="px-6 py-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentRecords.map((record, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-[15px]">{record.name}</div>
                    <div className="text-[12px] text-gray-400 font-medium">{record.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.dept}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="text-gray-300" size="xs" /> {record.checkIn}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      {record.checkOut !== '-' && <FontAwesomeIcon icon={faClock} className="text-gray-300" size="xs" />}
                      {record.checkOut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{record.hours}</td>
                  <td className="px-6 py-4">
                    {record.status === 'Checked In' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[12px] font-bold border border-emerald-100">
                        <FontAwesomeIcon icon={faCircleCheck} size="sm" /> Checked In
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-[12px] font-bold border border-gray-200">
                        <FontAwesomeIcon icon={faCircleExclamation} size="sm" /> Checked Out
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-xl">
          {/* <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-slate-800">{indexOfFirstItem + 1}</span> to <span className="font-semibold text-slate-800">{Math.min(indexOfLastItem, allRecords.length)}</span> of <span className="font-semibold text-slate-800">{allRecords.length}</span> entries
          </div> */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 px-4 rounded border transition-all ${currentPage === 1 ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-slate-600 border-gray-200 hover:bg-gray-50'}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="xs" />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 px-4 rounded border transition-all ${currentPage === totalPages ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-slate-600 border-gray-200 hover:bg-gray-50'}`}
            >
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;