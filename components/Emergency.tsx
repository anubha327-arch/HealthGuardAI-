import React from 'react';
import { Phone, Ambulance, ShieldAlert, ChevronRight } from 'lucide-react';

const Emergency: React.FC = () => {
  return (
    <div className="space-y-6 pt-2">
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
           <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Emergency Help</h2>
        <p className="text-gray-500">One-tap assistance for urgent situations</p>
      </div>

      {/* Main SOS Button */}
      <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 shadow-xl shadow-red-200 transform transition-all active:scale-95 flex items-center justify-between group">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Phone className="w-8 h-8" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold">Call 112</div>
            <div className="text-red-100 text-sm">National Emergency</div>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 opacity-60 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="bg-white border-2 border-orange-100 hover:border-orange-200 p-5 rounded-xl shadow-sm flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
            <Ambulance className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-800">Call Ambulance</div>
            <div className="text-xs text-gray-500">Private service</div>
          </div>
        </button>

        <button className="bg-white border-2 border-blue-100 hover:border-blue-200 p-5 rounded-xl shadow-sm flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-800">Emergency Contact</div>
            <div className="text-xs text-gray-500">Mom (Default)</div>
          </div>
        </button>
      </div>

      {/* Nearest Hospital Map Placeholder */}
      <div className="bg-gray-200 rounded-xl h-48 w-full relative overflow-hidden flex items-center justify-center text-gray-500 shadow-inner">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/600/300')] bg-cover opacity-50"></div>
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg z-10 font-medium shadow-sm flex items-center gap-2">
            <MapPinIcon />
            Locating nearest hospital...
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800">
        <strong>Note:</strong> In a life-threatening emergency, always dial your local emergency number directly from your phone dialer if this app is unresponsive.
      </div>
    </div>
  );
};

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)

export default Emergency;