import React from 'react';
import { MedicalRecord } from '../types';
import { FileText, Download, Eye, Upload, Filter, Plus } from 'lucide-react';

const mockRecords: MedicalRecord[] = [
  { id: '1', title: 'Blood Test Results', type: 'Lab Report', date: '2023-11-15', doctor: 'Dr. Sarah Wilson' },
  { id: '2', title: 'Amoxicillin Rx', type: 'Prescription', date: '2023-10-02', doctor: 'Dr. James Chen' },
  { id: '3', title: 'Chest X-Ray', type: 'X-Ray', date: '2023-08-20', doctor: 'Dr. Emily Brooks' },
  { id: '4', title: 'Annual Physical', type: 'Other', date: '2023-06-10', doctor: 'Dr. Michael Ross' },
];

const Records: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Medical Records</h2>
        <button className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-100 transition-colors">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium shadow-sm">
          <Filter className="w-4 h-4" />
          All Records
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium whitespace-nowrap">
          Lab Reports
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium whitespace-nowrap">
          Prescriptions
        </button>
      </div>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-primary-200 rounded-xl bg-primary-50/50 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary-50 transition-colors">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-primary-500">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-700">Upload New Record</h3>
        <p className="text-xs text-gray-500 mt-1">Tap to browse or drop file here</p>
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {mockRecords.map(record => (
          <div key={record.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform active:scale-[0.99]">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 
              ${record.type === 'Prescription' ? 'bg-purple-100 text-purple-600' : 
                record.type === 'Lab Report' ? 'bg-blue-100 text-blue-600' : 
                'bg-orange-100 text-orange-600'}`}>
              <FileText className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 truncate">{record.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{record.type} • {record.date}</p>
              <p className="text-xs text-primary-600 mt-1">{record.doctor}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-slate-600 hover:bg-gray-50 rounded-full" aria-label="View">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Records;