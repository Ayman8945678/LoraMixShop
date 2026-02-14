
import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group bg-white rounded-lg overflow-hidden border border-gray-50 hover:shadow-sm transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50/30">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-1 left-1 bg-slate-900 text-white text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
            New
          </span>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-1 right-1 bg-white/95 text-slate-900 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-slate-900 hover:text-white"
        >
          <Plus size={12} />
        </button>
      </div>
      
      <div className="p-2 flex flex-col flex-grow space-y-0.5">
        <p className="text-[7px] text-slate-300 uppercase tracking-widest font-black">{product.category}</p>
        <h3 className="font-bold text-[10px] text-slate-900 group-hover:text-slate-500 transition-colors line-clamp-1 leading-tight">{product.name}</h3>
        <div className="pt-1 mt-auto">
          <span className="text-[11px] font-black text-slate-900 tracking-tight">${product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
