import React, { useState } from 'react';
import { User } from '../types';
import { ChevronRight, HeartPulse } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const user: User = {
      id: '123',
      name: isRegistering ? name : 'Alex Morgan',
      email: email,
      avatarUrl: 'https://picsum.photos/seed/123/200'
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary-600 p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
           <div className="relative z-10 flex flex-col items-center">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 mb-4 shadow-lg transform rotate-3">
               <HeartPulse className="w-9 h-9" />
             </div>
             <h1 className="text-3xl font-bold text-white tracking-tight">HealthGuard</h1>
             <p className="text-primary-100 mt-2 text-sm">Your Personal AI Healthcare Companion</p>
           </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Email or Phone</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isRegistering ? 'Get Started' : 'Sign In'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="ml-1 text-primary-600 font-bold hover:underline"
              >
                {isRegistering ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;