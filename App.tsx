
import React, { useState, useCallback, useEffect } from 'react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import GeminiAssistant from './components/GeminiAssistant';
import { Product, CartItem, Page } from './types';
import { MOCK_PRODUCTS } from './constants';
import { supabase } from './services/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setDbError(null);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Handle specific "Table not found" error
        if (error.code === 'PGRST116' || error.message.includes('schema cache')) {
          console.warn('Supabase table "products" not found. Falling back to mock data. Please create the table in Supabase SQL Editor.');
          setDbError('Database table "products" is missing. Showing local collection instead.');
        } else {
          console.error('Supabase error:', error.message);
        }
      } else if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to connect to Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const latestProducts = [...products].reverse().slice(0, 10);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleNavigate = useCallback((page: Page, product: Product | null = null) => {
    setCurrentPage(page);
    if (product) setSelectedProduct(product);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <Loader2 size={48} className="text-[#D4AF37] animate-spin" />
          <div className="absolute inset-0 bg-[#D4AF37] blur-2xl opacity-20 animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-white font-black uppercase tracking-[0.5em] text-xs">Connecting to Vault</h2>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">Lora Mix Shop Backend</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <div className="lg:pl-60 flex flex-col min-h-screen">
        {dbError && (
          <div className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/20 px-6 py-2 flex items-center justify-center gap-2">
            <AlertCircle size={14} className="text-[#D4AF37]" />
            <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">{dbError}</p>
          </div>
        )}
        <Navbar 
          onNavigate={handleNavigate} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        />

        <main className="flex-1">
          {currentPage === Page.HOME && (
            <div className="space-y-24 pb-24">
              <Hero 
                onShopNow={() => {
                  const el = document.getElementById('full-collection');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }} 
                latestProducts={latestProducts}
              />
              
              <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">Curated For You</p>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Featured Artifacts</h2>
                  </div>
                  <button 
                    onClick={() => handleNavigate(Page.SHOP)}
                    className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    View All Gallery <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {products.slice(0, 6).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                      onClick={(p) => handleNavigate(Page.PRODUCT_DETAIL, p)}
                    />
                  ))}
                </div>
              </section>

              <section className="bg-slate-900 py-24 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-[#D4AF37]/10 blur-[120px] rounded-full translate-x-1/2" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8 relative z-10">
                    <h2 className="text-5xl font-black leading-tight text-white tracking-tighter uppercase">NO <span className="text-[#D4AF37]">COMPROMISE</span> ON QUALITY.</h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-md">
                      Each piece in our collection is meticulously vetted to ensure it meets our standard of technological and aesthetic excellence.
                    </p>
                    <div className="flex gap-16 pt-4">
                      <div className="space-y-1">
                        <h4 className="text-3xl font-black text-white">24K+</h4>
                        <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">Collectors</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-3xl font-black text-white">99.9%</h4>
                        <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[3rem] overflow-hidden group relative">
                    <img 
                      src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80" 
                      alt="Luxury Design" 
                      className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              </section>

              <section id="full-collection" className="px-6 md:px-12 max-w-7xl mx-auto pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">The Universe</h2>
                    <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.4em] mt-2">Browse the complete archive</p>
                  </div>
                  
                  <div className="flex gap-2 p-1.5 bg-gray-100 rounded-full overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${
                          activeCategory === cat 
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                            : 'text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 animate-in fade-in duration-700">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                      onClick={(p) => handleNavigate(Page.PRODUCT_DETAIL, p)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          {currentPage === Page.SHOP && (
            <div className="py-16 px-6 md:px-12 bg-white min-h-screen">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-12">
                  <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Archive Gallery</h2>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">{filteredProducts.length} Specimens Found</span>
                    <select className="bg-gray-50 border border-gray-100 rounded-full px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] outline-none transition-all focus:ring-2 focus:ring-slate-900">
                      <option>Latest Arrivals</option>
                      <option>Highest Value</option>
                      <option>Lowest Value</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                      onClick={(p) => handleNavigate(Page.PRODUCT_DETAIL, p)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentPage === Page.PRODUCT_DETAIL && selectedProduct && (
            <ProductDetail 
              product={selectedProduct}
              onBack={() => handleNavigate(Page.HOME)}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentPage === Page.CART && (
            <Cart 
              items={cart} 
              onUpdateQuantity={handleUpdateQuantity} 
              onRemove={handleRemoveFromCart} 
              onCheckout={() => alert('Initiating Secure Luxury Checkout...')} 
            />
          )}

          {currentPage === Page.ORDERS && (
            <div className="py-24 px-6 text-center space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Your Orders</h2>
              <p className="text-slate-400 font-medium">You have no active orders in your vault history.</p>
              <button onClick={() => handleNavigate(Page.SHOP)} className="px-8 py-3 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-widest">Start Collecting</button>
            </div>
          )}

          {currentPage === Page.SETTINGS && (
            <div className="py-24 px-6 text-center space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Vault Settings</h2>
              <p className="text-slate-400 font-medium">Configure your command center preferences here.</p>
              <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Notifications</span>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Dark Interface</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                </div>
              </div>
            </div>
          )}

          <footer className="bg-slate-900 pt-24 pb-12 px-6 md:px-12 mt-auto text-white">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black tracking-tighter uppercase">ELITE<span className="font-light text-slate-500">GADGET</span></h3>
                  <p className="max-w-xs text-slate-400 text-sm leading-relaxed font-medium">
                    Redefining the boundaries of technological luxury since 2024. Curated for the few, appreciated by the many.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Explore</h4>
                    <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <li><button onClick={() => handleNavigate(Page.HOME)} className="hover:text-white transition-colors">Home</button></li>
                      <li><button onClick={() => handleNavigate(Page.SHOP)} className="hover:text-white transition-colors">Gallery</button></li>
                      <li>Vault</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Legacy</h4>
                    <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <li>Philosophy</li>
                      <li>Heritage</li>
                      <li>Terms</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">© 2024 Artifacts Collective. All Rights Reserved.</p>
                <div className="flex gap-8">
                   <div className="h-6 w-10 bg-white/5 rounded-md" />
                   <div className="h-6 w-10 bg-white/5 rounded-md" />
                   <div className="h-6 w-10 bg-white/5 rounded-md" />
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <GeminiAssistant cart={cart} />
    </div>
  );
};

export default App;
