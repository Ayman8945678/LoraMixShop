
import React from 'react';
import { ArrowLeft, Star, ShoppingBag, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 ring-slate-900 transition-all opacity-60 hover:opacity-100">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <p className="text-gold-500 font-bold uppercase tracking-widest text-sm" style={{ color: '#D4AF37' }}>
              {product.category}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"} 
                    stroke={i < Math.floor(product.rating) ? "#D4AF37" : "#CBD5E1"} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-400">Trusted by over 2,000+ collectors</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">${product.price.toLocaleString()}</p>
          </div>

          <p className="text-slate-500 text-lg leading-relaxed">
            {product.description} This masterpiece represents the intersection of high-end industrial design and cutting-edge technology. Experience superior performance with a minimalist aesthetic that complements any modern lifestyle.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              In Stock & Ready for Priority Dispatch
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-grow bg-slate-900 text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
              >
                <ShoppingBag size={20} />
                Add to Bag
              </button>
              <button className="p-5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                <ShieldCheck size={24} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={24} className="text-slate-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Global Express</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck size={24} className="text-slate-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Lifetime Warranty</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCcw size={24} className="text-slate-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Premium Returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
