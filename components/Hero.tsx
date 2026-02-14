
import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onShopNow: () => void;
  latestProducts: Product[];
}

const Hero: React.FC<HeroProps> = ({ onShopNow, latestProducts }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (latestProducts.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % latestProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [latestProducts.length]);

  return (
    <div className="relative min-h-[90vh] w-full bg-[#0a0f1a] flex flex-col md:flex-row items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full md:w-1/2 px-8 md:px-20 py-16 md:py-0 space-y-10">
        <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-[#D4AF37]" />
            <p className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-[10px]">
              Collection 2024
            </p>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            THE NEW <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">
              ELITE.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
            Where technological supremacy meets aesthetic perfection. 
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-left-12 duration-1000 delay-300">
          <button 
            onClick={onShopNow}
            className="group relative flex items-center justify-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">Explore Universe</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" size={18} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
          
          <button className="group px-10 py-5 rounded-full border border-slate-800 text-slate-300 font-black text-xs uppercase tracking-widest hover:border-white hover:text-white transition-all duration-300 backdrop-blur-sm">
            Our Philosophy
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-1/2 h-[600px] md:h-full flex items-center justify-center p-8 md:p-12">
        <div className="relative w-full max-w-sm aspect-[4/5] bg-white/5 border border-white/10 rounded-[3rem] p-4 backdrop-blur-md shadow-2xl overflow-hidden group">
          {latestProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`absolute inset-0 p-10 flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
                index === activeIndex 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-90 translate-y-20 pointer-events-none'
              }`}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full aspect-square object-cover rounded-[2rem] shadow-2xl mb-8 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="text-center space-y-3">
                <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">{product.category}</span>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">{product.name}</h3>
                <p className="text-xl font-light text-white/60">${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
            {latestProducts.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-12 bg-[#D4AF37]' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
