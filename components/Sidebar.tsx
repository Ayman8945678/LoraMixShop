
import React from 'react';
import { X, Home, Package, ShoppingCart, Settings, Zap, User } from 'lucide-react';
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
    { id: Page.HOME, label: 'Home', icon: Home },
    { id: Page.SHOP, label: 'Products', icon: Package },
    { id: Page.ORDERS, label: 'Orders', icon: ShoppingCart },
    { id: Page.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Immersive Backdrop Blur - Only visible on mobile when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 z-[90] backdrop-blur-sm transition-opacity duration-700 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar - Persistent on desktop (w-60), Drawer on mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-60 h-full
        bg-white/40 backdrop-blur-3xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
        flex flex-col overflow-hidden border-r border-white/20
        ${isOpen ? 'translate-x-0 shadow-[20px_0_80px_rgba(0,0,0,0.04)]' : '-translate-x-full lg:translate-x-0 lg:shadow-none'}
      `}>
        
        {/* Top Section: Logo & Status */}
        <div className="p-6 pb-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => { onNavigate(Page.HOME); onClose(); }}
            >
              <div className="p-1.5 bg-slate-900 rounded-lg group-hover:bg-[#D4AF37] transition-colors duration-500">
                <Zap size={16} className="text-white" fill="currentColor" />
              </div>
              <h1 className="text-base font-black tracking-tighter text-slate-900">
                ELITE<span className="font-light text-slate-400">GADGET</span>
              </h1>
            </div>
            {/* Close button only for mobile */}
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-900/5 rounded-full transition-colors group lg:hidden"
            >
              <X size={18} className="text-slate-400 group-hover:text-slate-900" />
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/5 rounded-xl">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">System Live</span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-grow px-3 space-y-0.5">
          <p className="px-5 pb-3 text-[7px] font-black uppercase tracking-[0.4em] text-slate-300">Vault</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className={`
                w-full flex items-center gap-3.5 px-5 py-3.5 rounded-xl transition-all duration-500 group
                ${currentPage === item.id 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                  : 'text-slate-500 hover:bg-slate-900/5 hover:text-slate-900'}
              `}
            >
              <item.icon size={18} className={currentPage === item.id ? 'text-[#D4AF37]' : 'group-hover:text-slate-900'} />
              <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
              {currentPage === item.id && (
                <div className="ml-auto w-0.5 h-3.5 bg-[#D4AF37] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* User / Profile Section at bottom */}
        <div className="p-4 mt-auto">
          <div className="p-3 bg-white/40 rounded-2xl border border-white/50 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center border border-white shadow-sm overflow-hidden shrink-0">
               <User size={16} className="text-slate-400" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-tight leading-none truncate">Guest User</span>
              <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">v1.2</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
