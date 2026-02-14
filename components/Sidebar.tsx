
import React from 'react';
import { X, Home, Package, ShoppingCart, Settings, Zap, User as UserIcon, ArrowRight, LogIn, UserCircle, LogOut } from 'lucide-react';
import { Page, User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  currentPage,
  user,
  onLogout
}) => {
  const navItems = [
    { id: Page.HOME, label: 'Frontier', icon: Home },
    { id: Page.SHOP, label: 'Artifacts', icon: Package },
    { id: Page.ORDERS, label: 'Vault History', icon: ShoppingCart },
    ...(user ? [{ id: Page.PROFILE, label: 'Identity Vault', icon: UserCircle }] : []),
    { id: Page.SETTINGS, label: 'Command Hub', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/20 z-[90] backdrop-blur-md transition-opacity duration-700 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-64 h-full
        bg-white/10 backdrop-blur-2xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
        flex flex-col overflow-hidden border-r border-white/20
        ${isOpen ? 'translate-x-0 shadow-[40px_0_100px_rgba(0,0,0,0.05)]' : '-translate-x-full lg:translate-x-0'}
      `}>
        
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
              </div>
              <h1 className="text-lg font-black tracking-tighter text-slate-900 leading-none">
                ELITE<span className="font-thin text-slate-400">GADGET</span>
              </h1>
            </div>
            
            <button 
              onClick={onClose} 
              className="lg:hidden p-2 hover:bg-white/50 rounded-full transition-all"
            >
              <X size={18} className="text-slate-400" />
            </button>
          </div>
        </div>

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
                  {currentPage === item.id && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#D4AF37]" />
                  )}
                  <item.icon size={20} className={currentPage === item.id ? 'text-[#D4AF37]' : ''} />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 mt-auto space-y-3">
          {user ? (
            <>
              <div 
                onClick={() => { onNavigate(Page.PROFILE); onClose(); }}
                className="p-4 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/80 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border-2 border-white shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-500">
                     <UserIcon size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight truncate">{user.name}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Authorized</span>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="w-full py-3 px-4 flex items-center justify-center gap-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <LogOut size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => { onNavigate(Page.LOGIN); onClose(); }}
              className="w-full p-4 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center gap-3 hover:bg-black transition-all group"
            >
              <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sign In</span>
            </button>
          )}
          
          <p className="pt-4 text-center text-[7px] font-black uppercase tracking-[0.4em] text-slate-300">
            Elite Protocol 2024
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
