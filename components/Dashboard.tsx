import React, { useEffect, useState } from 'react';
import { User, HealthMetric } from '../types';
import { generateHealthTip } from '../services/geminiService';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Footprints, Heart, Scale, Droplets, CheckCircle2, Circle, Pill, Clock } from 'lucide-react';

interface DashboardProps {
  user: User;
}

interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment' | 'general';
  completed: boolean;
}

const data = [
  { name: 'Mon', steps: 4000 },
  { name: 'Tue', steps: 3000 },
  { name: 'Wed', steps: 2000 },
  { name: 'Thu', steps: 2780 },
  { name: 'Fri', steps: 1890 },
  { name: 'Sat', steps: 2390 },
  { name: 'Sun', steps: 3490 },
];

const initialReminders: Reminder[] = [
  { id: '1', title: 'Take Vitamin D (1000IU)', time: '08:00 AM', type: 'medication', completed: true },
  { id: '2', title: 'Drink 2 Glasses of Water', time: '02:00 PM', type: 'general', completed: false },
  { id: '3', title: 'Metformin (500mg)', time: '08:00 PM', type: 'medication', completed: false },
  { id: '4', title: 'Evening Stretching', time: '09:00 PM', type: 'general', completed: false },
];

const MetricCard: React.FC<{ metric: HealthMetric, icon: React.ElementType, color: string }> = ({ metric, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
      <div className="flex items-end gap-1 mt-1">
        <span className="text-2xl font-bold text-slate-800">{metric.value}</span>
        <span className="text-xs text-gray-400 mb-1">{metric.unit}</span>
      </div>
    </div>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [healthTip, setHealthTip] = useState<string>("Loading your daily tip...");
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  useEffect(() => {
    generateHealthTip().then(setHealthTip);
  }, []);

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'medication': return <Pill className="w-4 h-4" />;
      case 'appointment': return <Clock className="w-4 h-4" />;
      default: return <div className="w-2 h-2 rounded-full bg-current" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, {user.name.split(' ')[0]} 👋</h2>
          <p className="text-slate-500">Here is your daily health summary.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
          <img src={`https://picsum.photos/seed/${user.id}/200`} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* AI Health Tip */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold backdrop-blur-sm">Daily AI Tip</span>
          </div>
          <p className="font-medium text-lg leading-snug">"{healthTip}"</p>
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard 
          metric={{ label: 'Heart Rate', value: '72', unit: 'bpm', status: 'good' }} 
          icon={Heart} 
          color="bg-rose-500" 
        />
        <MetricCard 
          metric={{ label: 'Steps', value: '3,490', unit: '/ 10k', status: 'warning' }} 
          icon={Footprints} 
          color="bg-orange-500" 
        />
        <MetricCard 
          metric={{ label: 'Weight', value: '68', unit: 'kg', status: 'good' }} 
          icon={Scale} 
          color="bg-indigo-500" 
        />
        <MetricCard 
          metric={{ label: 'Hydration', value: '4', unit: 'glasses', status: 'warning' }} 
          icon={Droplets} 
          color="bg-sky-500" 
        />
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Activity Trend</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="steps" 
                stroke="#0ea5e9" 
                strokeWidth={3} 
                dot={{fill: '#0ea5e9', strokeWidth: 2, r: 4, stroke: '#fff'}} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Reminders Section */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Today's Reminders</h3>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {reminders.filter(r => r.completed).length}/{reminders.length} Done
          </span>
        </div>
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div 
              key={reminder.id}
              onClick={() => toggleReminder(reminder.id)}
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer select-none group ${
                reminder.completed 
                  ? 'bg-gray-50 border-gray-100 opacity-60' 
                  : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-sm'
              }`}
            >
              <div className={`shrink-0 transition-colors ${reminder.completed ? 'text-emerald-500' : 'text-gray-300 group-hover:text-primary-400'}`}>
                {reminder.completed ? <CheckCircle2 className="w-6 h-6 fill-emerald-50" /> : <Circle className="w-6 h-6" />}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-semibold text-sm ${reminder.completed ? 'text-gray-500 line-through' : 'text-slate-800'}`}>
                  {reminder.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs flex items-center gap-1 ${reminder.completed ? 'text-gray-400' : 'text-primary-600 font-medium'}`}>
                    {getReminderIcon(reminder.type)}
                    {reminder.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Reminders (Schedule) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-800 mb-3">Today's Schedule</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-lg flex flex-col items-center justify-center">
              <span className="text-xs font-bold">FEB</span>
              <span className="text-lg font-bold leading-none">24</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Dr. Sarah Wilson</h4>
              <p className="text-sm text-gray-500">General Checkup • 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;