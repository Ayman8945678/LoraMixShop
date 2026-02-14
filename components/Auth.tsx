
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Github, Chrome } from 'lucide-react';

interface AuthProps {
  onAuthComplete: (user: any) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthComplete, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating authentication
    setTimeout(() => {
      onAuthComplete({ id: '1', name: 'Elite Collector', email: 'user@elite.com', isAdmin: false });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
            {isLogin ? 'Welcome Back' : 'Join the Elite'}
          </h2>
          <p className="text-slate-400 font-medium text-sm">
            {isLogin ? 'Access your private vault and artifacts.' : 'Begin your journey into technological luxury.'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
          {/* Subtle decorative background */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full" />
          
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <input 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                <input 
                  type="email" 
                  required 
                  placeholder="name@luxury.com"
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                {isLogin && <button type="button" className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Authorize Entry' : 'Create Vault'}
              {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.3em]"><span className="bg-white px-4 text-slate-300">Third Party Auth</span></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                <Chrome size={16} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                <Github size={16} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">GitHub</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have a vault? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
