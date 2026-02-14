
import React from 'react';
import { X, Home, Package, ShoppingCart, Settings, Zap, User, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  currentPage 
}) => {
  const navItems = [
    { id: Page.HOME, label: 'Frontier', icon: Home },
    { id: Page.SHOP, label: 'Artifacts', icon: Package },
    { id: Page.ORDERS, label: 'Vault History', icon: ShoppingCart },
    { id: Page.SETTINGS, label: 'Command Hub', icon: Settings },
  ];

  return (
    <>
      {/* Immersive Backdrop Blur - Only visible on mobile when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/20 z-[90] backdrop-blur-md transition-opacity duration-700 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-64 h-full
        bg-white/10 backdrop-blur-2xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
        flex flex-col overflow-hidden border-r border-white/20
        ${isOpen ? 'translate-x-0 shadow-[40px_0_100px_rgba(0,0,0,0.05)]' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Branding Section */}
        <div className="p-8 pb-12">
          <div className="flex items-center justify-between mb-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { onNavigate(Page.HOME); onClose(); }}
            >
              <div className="relative">
                <div className="p-2 bg-slate-900 rounded-xl group-hover:bg-[#D4AF37] transition-all duration-500 rotate-3 group-hover:rotate-0">
                  <Zap size={18} className="text-white" fill="currentColor" />
                </div>
                <div className="absolute -inset-1 bg-[#D4AF37]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 leading-none">
                ELITE<span className="font-thin text-slate-400">GADGET</span>
              </h1>
            </div>
            
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/50 rounded-full transition-all group lg:hidden"
            >
              <X size={18} className="text-slate-400 group-hover:text-slate-900" />
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/40 border border-white/60 rounded-full shadow-sm">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-600">Secure Network Live</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-grow px-4">
          <p className="px-4 pb-4 text-[8px] font-black uppercase tracking-[0.5em] text-slate-300">Navigation Arch</p>
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { onNavigate(item.id); onClose(); }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden
                    ${currentPage === item.id 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'}
                  `}
                >
                  {/* Active Indicator Background */}
                  {currentPage === item.id && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#D4AF37]" />
                  )}
                  
                  <item.icon 
                    size={20} 
                    className={`transition-all duration-500 ${
                      currentPage === item.id ? 'text-[#D4AF37] scale-110' : 'group-hover:text-slate-900'
                    }`} 
                  />
                  
                  <span className={`text-sm font-bold tracking-tight transition-all duration-500 ${
                    currentPage === item.id ? 'translate-x-1' : ''
                  }`}>
                    {item.label}
                  </span>

                  {currentPage !== item.id && (
                    <ArrowRight size={14} className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D4AF37]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile / Status Footer */}
        <div className="p-6 mt-auto">
          <div className="p-4 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/80 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-[#D4AF37]/30 transition-all">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border-2 border-white shadow-inner overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                 <User size={20} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none truncate">Collector v.1</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Authorized Access</span>
            </div>
          </div>
          
          <p className="mt-6 text-center text-[7px] font-black uppercase tracking-[0.4em] text-slate-300">
            Elite Protocol 2024
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
