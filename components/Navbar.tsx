
import React from 'react';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { Page, User as UserType } from '../types';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  onToggleSidebar: () => void;
  cartCount: number;
  user: UserType | null;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onToggleSidebar, cartCount, user }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between transition-all">
      <div className="flex items-center gap-6">
        <button 
          onClick={onToggleSidebar}
          className="group flex items-center gap-3 px-4 py-2 bg-gray-50 hover:bg-slate-900 rounded-full transition-all duration-500 border border-gray-100 lg:hidden"
          aria-label="Open Menu"
        >
          <Menu size={18} className="group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">Menu</span>
        </button>
        
        <h1 
          className="text-2xl font-black tracking-tighter cursor-pointer group flex items-center gap-1 lg:hidden"
          onClick={() => onNavigate(Page.HOME)}
        >
          <span className="text-slate-900">ELITE</span>
          <span className="font-light text-slate-400 group-hover:text-[#D4AF37] transition-colors duration-500">GADGET</span>
        </h1>

        <div className="hidden lg:flex items-center gap-4 bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100 min-w-[300px]">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search artifacts..." 
            className="bg-transparent border-none outline-none text-xs font-medium w-full text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => onNavigate(user ? Page.PROFILE : Page.LOGIN)}
          className="p-2.5 text-slate-500 hover:text-[#D4AF37] hover:bg-slate-50 rounded-full transition-all"
        >
          <User size={20} strokeWidth={2.5} />
        </button>
        <button 
          onClick={() => onNavigate(Page.CART)}
          className="group flex items-center gap-2 pl-2 pr-4 py-2 bg-slate-900 hover:bg-black rounded-full transition-all duration-300 shadow-lg shadow-slate-900/20"
        >
          <div className="relative p-1">
            <ShoppingBag size={18} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-slate-900 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-black text-white uppercase tracking-widest border-l border-white/20 pl-2">Bag</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
