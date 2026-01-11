import React, { useState } from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, MapPin, Search, Star } from 'lucide-react';

const doctors = [
  { id: 1, name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', rating: 4.8, distance: '1.2 km', image: 'https://picsum.photos/seed/doc1/100' },
  { id: 2, name: 'Dr. James Chen', specialty: 'Dentist', rating: 4.9, distance: '2.5 km', image: 'https://picsum.photos/seed/doc2/100' },
  { id: 3, name: 'Dr. Emily Brooks', specialty: 'General Practitioner', rating: 4.7, distance: '0.8 km', image: 'https://picsum.photos/seed/doc3/100' },
  { id: 4, name: 'Dr. Michael Ross', specialty: 'Dermatologist', rating: 4.9, distance: '3.0 km', image: 'https://picsum.photos/seed/doc4/100' },
];

const Appointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'book'>('book');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Appointments</h2>

      {/* Tab Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('book')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'book' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500'
          }`}
        >
          Book New
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'upcoming' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500'
          }`}
        >
          Upcoming
        </button>
      </div>

      {activeTab === 'book' ? (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search doctors, specialty..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['General', 'Dentist', 'Cardio', 'Derma', 'Vision'].map((filter) => (
              <button key={filter} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 whitespace-nowrap hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600">
                {filter}
              </button>
            ))}
          </div>

          {/* Doctor List */}
          <div className="space-y-4">
            {doctors.map(doc => (
              <div key={doc.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4">
                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800">{doc.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs text-yellow-700 font-medium">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      {doc.rating}
                    </div>
                  </div>
                  <p className="text-sm text-primary-600 font-medium">{doc.specialty}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <MapPin className="w-3 h-3" />
                    {doc.distance} from you
                  </div>
                  <button className="mt-3 w-full py-2 bg-gray-50 text-primary-700 text-sm font-semibold rounded-lg hover:bg-primary-50 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Upcoming View */
        <div className="space-y-4">
           <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-primary-500 relative">
             <div className="flex justify-between items-start mb-2">
               <div>
                 <h3 className="font-bold text-slate-800 text-lg">Dr. Sarah Wilson</h3>
                 <p className="text-primary-600 text-sm">Cardiologist</p>
               </div>
               <span className="bg-primary-50 text-primary-700 text-xs font-bold px-2 py-1 rounded">CONFIRMED</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mt-4">
               <div className="flex items-center gap-2 text-gray-600 text-sm">
                 <Calendar className="w-4 h-4 text-gray-400" />
                 <span>Feb 24, 2024</span>
               </div>
               <div className="flex items-center gap-2 text-gray-600 text-sm">
                 <Clock className="w-4 h-4 text-gray-400" />
                 <span>10:00 AM</span>
               </div>
             </div>
             
             <div className="mt-4 flex gap-3">
               <button className="flex-1 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg shadow-sm shadow-primary-200">
                 Reschedule
               </button>
               <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg">
                 Cancel
               </button>
             </div>
           </div>
           
           <div className="text-center text-gray-400 text-sm mt-8">
             No more upcoming appointments.
           </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;