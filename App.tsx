
import React, { useState, useCallback, useEffect } from 'react';
import { ArrowRight, Loader2, AlertCircle, Database, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Profile from './components/Profile';
import GeminiAssistant from './components/GeminiAssistant';
import { Product, CartItem, Page, User } from './types';
import { MOCK_PRODUCTS } from './constants';
import { supabase, profileService } from './services/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'online' | 'offline' | 'error'>('offline');
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
        setDbStatus('error');
        if (error.code === 'PGRST116' || error.message.includes('relation "products" does not exist')) {
          setDbError('Database table "products" is missing in your Supabase project.');
        } else {
          setDbError(error.message);
        }
      } else if (data) {
        setProducts(data.length > 0 ? data : MOCK_PRODUCTS);
        setDbStatus('online');
      }
    } catch (err) {
      setDbStatus('error');
      setDbError('Could not connect to database server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAuthComplete = async (user: User) => {
    setIsLoading(true);
    // Try to get existing profile from DB
    const dbProfile = await profileService.getProfile(user.email);
    if (dbProfile) {
      setCurrentUser({ ...user, ...dbProfile });
    } else {
      setCurrentUser(user);
    }
    setIsLoading(false);
    setCurrentPage(Page.HOME);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    const result = await profileService.upsertProfile(updatedUser);
    if (result.success) {
      setCurrentUser(updatedUser);
    } else {
      // Fallback update even if DB fails
      setCurrentUser(updatedUser);
      console.error('Persistance failed, updated local state only.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(Page.HOME);
    setIsSidebarOpen(false);
  };

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

  const latestProducts = [...products].reverse().slice(0, 10);
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
          <h2 className="text-white font-black uppercase tracking-[0.5em] text-xs">Synchronizing Vault</h2>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">Checking secure database layers...</p>
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
        user={currentUser}
        onLogout={handleLogout}
      />

      <div className="lg:pl-60 flex flex-col min-h-screen">
        {/* Database Status Bar */}
        <div className={`px-6 py-2 flex items-center justify-between border-b transition-colors duration-500 ${
          dbStatus === 'online' ? 'bg-green-50/50 border-green-100' : 
          dbStatus === 'error' ? 'bg-red-50/50 border-red-100' : 'bg-slate-50 border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            {dbStatus === 'online' ? (
              <Wifi size={12} className="text-green-500" />
            ) : dbStatus === 'error' ? (
              <WifiOff size={12} className="text-red-500" />
            ) : (
              <RefreshCw size={12} className="text-slate-400 animate-spin" />
            )}
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${
              dbStatus === 'online' ? 'text-green-600' : 
              dbStatus === 'error' ? 'text-red-600' : 'text-slate-500'
            }`}>
              {dbStatus === 'online' ? 'Database Linked' : dbStatus === 'error' ? 'Sync Error' : 'Connecting...'}
            </span>
          </div>
          {dbError && (
            <div className="flex items-center gap-2">
              <AlertCircle size={10} className="text-red-400" />
              <p className="text-[8px] font-bold text-red-400 uppercase tracking-tight truncate max-w-[200px]">{dbError}</p>
              <button onClick={fetchProducts} className="ml-2 text-[8px] font-black text-slate-900 underline uppercase">Retry</button>
            </div>
          )}
        </div>

        <Navbar 
          onNavigate={handleNavigate} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          user={currentUser}
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
              <section id="full-collection" className="px-6 md:px-12 max-w-7xl mx-auto">
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
            </div>
          )}

          {currentPage === Page.LOGIN && (
            <Auth onAuthComplete={handleAuthComplete} onBack={() => setCurrentPage(Page.HOME)} />
          )}

          {currentPage === Page.PROFILE && currentUser && (
            <Profile 
              user={currentUser} 
              onUpdate={handleUpdateUser} 
              onLogout={handleLogout}
              onBack={() => setCurrentPage(Page.HOME)} 
            />
          )}

          {currentPage === Page.SHOP && (
            <div className="py-16 px-6 md:px-12 bg-white min-h-screen">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-12">
                  <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Archive Gallery</h2>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">{filteredProducts.length} Specimens Found</span>
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
              onCheckout={() => currentUser ? alert('Initiating Secure Luxury Checkout...') : setCurrentPage(Page.LOGIN)} 
            />
          )}

          {currentPage === Page.ORDERS && (
            <div className="py-24 px-6 text-center space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Your Orders</h2>
              <p className="text-slate-400 font-medium">
                {currentUser ? "You have no active orders in your vault history." : "Please sign in to view your orders."}
              </p>
              {!currentUser && (
                <button onClick={() => setCurrentPage(Page.LOGIN)} className="px-8 py-3 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-widest">Sign In</button>
              )}
            </div>
          )}

          {currentPage === Page.SETTINGS && (
            <div className="py-24 px-6 text-center space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Vault Settings</h2>
              <p className="text-slate-400 font-medium">Configure your command center preferences here.</p>
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
              </div>
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">© 2024 Artifacts Collective. All Rights Reserved.</p>
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
