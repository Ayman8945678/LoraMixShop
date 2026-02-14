
import React from 'react';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 space-y-4">
        <div className="bg-gray-100 p-8 rounded-full text-gray-400">
          <ShoppingCart size={48} strokeWidth={1} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 text-center max-w-xs">
          Explore our collection and discover the perfect addition to your digital lifestyle.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-8">Shopping Bag <span className="text-gray-400 font-light">({items.length} items)</span></h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100 items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="hover:text-gold-500 disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="hover:text-gold-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit space-y-6 sticky top-24">
          <h3 className="text-xl font-bold">Order Summary</h3>
          <div className="space-y-4 border-b border-gray-100 pb-6">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Complimentary</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (Est.)</span>
              <span>${(subtotal * 0.08).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-slate-900">
              ${(subtotal * 1.08).toFixed(2)}
            </span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-slate-900 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-black transition-all group"
          >
            Checkout Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
            Secure Encrypted Payments
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
