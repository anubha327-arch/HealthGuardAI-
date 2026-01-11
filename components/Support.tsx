import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, ArrowLeft, HeadphonesIcon } from 'lucide-react';

interface SupportProps {
  onBack: () => void;
  userEmail?: string;
  userName?: string;
}

const Support: React.FC<SupportProps> = ({ onBack, userEmail, userName }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mykkgqkp", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Formspree error:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">Thank you for reaching out. Our support team will get back to you at {userEmail || 'your email'} shortly.</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
      <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 text-gray-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
                <HeadphonesIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Contact Support</h2>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-slate-600 mb-6 text-sm bg-blue-50 p-4 rounded-xl border border-blue-100">
          Have a question about the app or need medical assistance? Fill out the form below and our team will help you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Your Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={userName}
              required 
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-800 font-medium"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              defaultValue={userEmail}
              required 
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-800 font-medium"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">How can we help?</label>
            <textarea 
              name="message" 
              required 
              rows={5}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-800 font-medium resize-none"
              placeholder="Describe your issue or question..."
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-3 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0" />
              Something went wrong sending your message. Please try again later.
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {status === 'submitting' ? (
                <>Sending...</>
            ) : (
                <>
                    Send Message
                    <Send className="w-4 h-4" />
                </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;