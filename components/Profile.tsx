
import React, { useState, useEffect } from 'react';
// Added RefreshCw to imports
import { User as UserIcon, MapPin, Phone, Mail, Save, ArrowLeft, Camera, LogOut, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => Promise<void>;
  onLogout: () => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout, onBack }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.address || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || ''
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus('idle');
    
    try {
      await onUpdate({ ...user, ...formData });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Return to Frontier</span>
        </button>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors group px-4 py-2 rounded-full border border-red-100 hover:bg-red-50"
        >
          <LogOut size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Deauthorize Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Avatar Card */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            
            <div className="relative group cursor-pointer mb-6">
              <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                <UserIcon size={40} className="text-white" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{user.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Identity Sync Active</p>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-4">
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Vault Security</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">Any changes made here are synchronized with your secure identity vault in real-time.</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative">
            {status === 'success' && (
              <div className="absolute inset-x-0 -top-4 flex justify-center animate-in slide-in-from-top-4 duration-500">
                <div className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-xl">
                  <CheckCircle2 size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol Synchronized</span>
                </div>
              </div>
            )}
            
            {status === 'error' && (
              <div className="absolute inset-x-0 -top-4 flex justify-center animate-in slide-in-from-top-4 duration-500">
                <div className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-xl">
                  <AlertCircle size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Database Sync Failed</span>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8">Identify Modification</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Legal Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={16} />
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-slate-900 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all"
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-200" size={16} />
                    <input 
                      type="email"
                      readOnly
                      value={formData.email}
                      className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-300 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Contact Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={16} />
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-slate-900 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dispatch Coordinates (Address)</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={16} />
                  <textarea 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-slate-900 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all resize-none"
                    placeholder="Enter full shipping details..."
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Connecting to Database...
                  </>
                ) : (
                  <>
                    Save & Sync Protocol
                    <Save size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
