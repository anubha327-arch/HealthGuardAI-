import React, { useState, useEffect } from 'react';
import { ViewState, User } from './types';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  MessageSquareHeart, 
  LogOut, 
  Menu,
  Phone,
  Activity,
  User as UserIcon,
  HelpCircle
} from 'lucide-react';

// Components
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import Records from './components/Records';
import Assistant from './components/Assistant';
import Emergency from './components/Emergency';
import Auth from './components/Auth';
import Support from './components/Support';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.AUTH);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulate persistent login for demo
  useEffect(() => {
    const storedUser = localStorage.getItem('health_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentView(ViewState.DASHBOARD);
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('health_user', JSON.stringify(newUser));
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('health_user');
    setCurrentView(ViewState.AUTH);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('health_user', JSON.stringify(updatedUser));
  };

  const NavButton = ({ view, icon: Icon, label }: { view: ViewState, icon: React.ElementType, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex flex-col items-center justify-center w-full py-2 transition-colors duration-200 ${
        currentView === view 
          ? 'text-primary-600 font-semibold' 
          : 'text-gray-500 hover:text-primary-500'
      }`}
    >
      <Icon className={`w-6 h-6 mb-1 ${currentView === view ? 'stroke-[2.5px]' : ''}`} />
      <span className="text-[10px] sm:text-xs">{label}</span>
    </button>
  );

  if (!user || currentView === ViewState.AUTH) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto sm:max-w-full shadow-2xl sm:shadow-none overflow-hidden relative">
      
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">HealthGuard</h1>
        </div>
        <div className="flex items-center gap-3">
           {/* Support Quick Action */}
           <button 
             onClick={() => setCurrentView(ViewState.SUPPORT)}
             className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${currentView === ViewState.SUPPORT ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}
             aria-label="Support"
           >
             <HelpCircle className="w-5 h-5" />
           </button>
           {/* Emergency Quick Action */}
           <button 
             onClick={() => setCurrentView(ViewState.EMERGENCY)}
             className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${currentView === ViewState.EMERGENCY ? 'bg-red-100 text-red-600' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
             aria-label="Emergency"
           >
             <Phone className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
        <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full">
          {currentView === ViewState.DASHBOARD && <Dashboard user={user} />}
          {currentView === ViewState.APPOINTMENTS && <Appointments />}
          {currentView === ViewState.RECORDS && <Records />}
          {currentView === ViewState.ASSISTANT && <Assistant user={user} />}
          {currentView === ViewState.EMERGENCY && <Emergency />}
          {currentView === ViewState.SUPPORT && <Support onBack={() => setCurrentView(ViewState.DASHBOARD)} userEmail={user.email} userName={user.name} />}
          {currentView === ViewState.PROFILE && <Profile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />}
        </div>
      </main>

      {/* Floating Action Button (FAB) for Assistant on mobile if not on assistant screen */}
      {currentView !== ViewState.ASSISTANT && currentView !== ViewState.EMERGENCY && currentView !== ViewState.SUPPORT && (
        <button
          onClick={() => setCurrentView(ViewState.ASSISTANT)}
          className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full shadow-xl flex items-center justify-center z-40 hover:scale-105 transition-transform active:scale-95"
          aria-label="AI Assistant"
        >
          <MessageSquareHeart className="w-7 h-7" />
        </button>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md sm:max-w-full z-50 pb-safe">
        <div className="flex justify-around items-end max-w-5xl mx-auto">
          <NavButton view={ViewState.DASHBOARD} icon={LayoutDashboard} label="Home" />
          <NavButton view={ViewState.APPOINTMENTS} icon={CalendarDays} label="Book" />
          <NavButton view={ViewState.RECORDS} icon={FileText} label="Records" />
          <NavButton view={ViewState.EMERGENCY} icon={Activity} label="Urgent" />
          <NavButton view={ViewState.PROFILE} icon={UserIcon} label="Profile" />
        </div>
      </nav>
      
    </div>
  );
};

export default App;