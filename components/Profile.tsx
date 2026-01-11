import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Mail, Calendar, Droplet, Save, LogOut, Camera } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, onLogout }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age?.toString() || '',
    bloodType: user.bloodType || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      ...user,
      name: formData.name,
      age: formData.age ? parseInt(formData.age) : undefined,
      bloodType: formData.bloodType,
    };
    
    onUpdateUser(updatedUser);
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          {isEditing ? 'Cancel' : 'Edit Details'}
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center py-6 bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 w-full h-24 bg-gradient-to-r from-primary-500 to-primary-600"></div>
        <div className="relative mt-8">
           <div className="w-28 h-28 rounded-full border-4 border-white shadow-md bg-gray-200 overflow-hidden relative group cursor-pointer">
             <img 
                src={user.avatarUrl || `https://picsum.photos/seed/${user.id}/200`} 
                alt={user.name} 
                className="w-full h-full object-cover" 
             />
             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
             </div>
           </div>
        </div>
        <h3 className="mt-3 text-xl font-bold text-slate-800">{user.name}</h3>
        <p className="text-slate-500 text-sm">{user.email}</p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-lg text-center animate-in fade-in slide-in-from-top-2">
          {message}
        </div>
      )}

      {/* Details Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 space-y-4">
          
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <UserIcon className="w-3 h-3" /> Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-white disabled:border-transparent disabled:px-0 disabled:text-slate-800 disabled:font-medium transition-all"
            />
          </div>

          <div className="h-px bg-gray-100"></div>

          {/* Email Field (Read Only) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-0 py-2 bg-transparent text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="h-px bg-gray-100"></div>

          <div className="grid grid-cols-2 gap-4">
             {/* Age Field */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                 <Calendar className="w-3 h-3" /> Age
               </label>
               <input
                 type="number"
                 value={formData.age}
                 onChange={(e) => setFormData({...formData, age: e.target.value})}
                 disabled={!isEditing}
                 placeholder="Not set"
                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-white disabled:border-transparent disabled:px-0 disabled:text-slate-800 disabled:font-medium transition-all"
               />
             </div>

             {/* Blood Type Field */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                 <Droplet className="w-3 h-3" /> Blood Type
               </label>
               {isEditing ? (
                 <select
                    value={formData.bloodType}
                    onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                 >
                   <option value="">Select...</option>
                   <option value="A+">A+</option>
                   <option value="A-">A-</option>
                   <option value="B+">B+</option>
                   <option value="B-">B-</option>
                   <option value="O+">O+</option>
                   <option value="O-">O-</option>
                   <option value="AB+">AB+</option>
                   <option value="AB-">AB-</option>
                 </select>
               ) : (
                 <input
                   type="text"
                   value={formData.bloodType || 'Not set'}
                   disabled
                   className="w-full px-0 py-2 bg-transparent text-slate-800 font-medium"
                 />
               )}
             </div>
          </div>
        </div>

        {isEditing && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
             <button 
               type="submit"
               className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-sm hover:bg-primary-700 active:scale-95 transition-all"
             >
               <Save className="w-4 h-4" />
               Save Changes
             </button>
          </div>
        )}
      </form>

      {/* Account Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-between p-4 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
        >
          <span className="font-medium flex items-center gap-3">
             <LogOut className="w-5 h-5" />
             Sign Out
          </span>
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs">→</span>
          </div>
        </button>
      </div>
      
      <div className="text-center text-xs text-gray-400 py-4">
        Version 1.0.2 • HealthGuard AI
      </div>
    </div>
  );
};

export default Profile;