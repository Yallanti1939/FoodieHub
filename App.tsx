
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router';
import { CheckCircle, Info, AlertCircle, Loader2 } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import RestaurantAdmin from './pages/RestaurantAdmin';
import Auth from './pages/Auth';
import { AppProvider, useAppContext } from './AppContext';

const Splash = () => (
  <div className="fixed inset-0 z-[10000] bg-rose-500 flex flex-col items-center justify-center text-white overflow-hidden">
    <div className="relative animate-in zoom-in duration-700">
      <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl animate-pulse">
        <span className="text-6xl">🍔</span>
      </div>
      <div className="absolute -inset-4 bg-white/20 rounded-[3rem] -z-10 animate-ping duration-1000" />
    </div>
    <div className="mt-8 space-y-4 text-center">
      <h1 className="text-4xl font-black tracking-tighter animate-in slide-in-from-bottom-4 duration-700">FoodieHub</h1>
      <p className="text-rose-100 text-xs font-black uppercase tracking-[0.4em] opacity-80">Premium Delivery</p>
    </div>
    
    <div className="absolute bottom-12 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
      <div className="h-full bg-white animate-loading-bar" />
    </div>

    <style>{`
      @keyframes loading-bar {
        0% { width: 0%; transform: translateX(-100%); }
        100% { width: 100%; transform: translateX(0%); }
      }
      .animate-loading-bar {
        animation: loading-bar 3s linear forwards;
      }
    `}</style>
  </div>
);

const ToastContainer = () => {
  const { toasts } = useAppContext();
  
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className="pointer-events-auto bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-right-4 duration-300 min-w-[280px]"
        >
          <div className={`p-2 rounded-xl ${
            toast.type === 'success' ? 'bg-green-50 text-green-500' :
            toast.type === 'error' ? 'bg-red-50 text-red-500' :
            'bg-blue-50 text-blue-500'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
             toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
             <Info className="w-5 h-5" />}
          </div>
          <p className="text-sm font-bold text-gray-800">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

const AppContent = () => {
  const { user } = useAppContext();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isAuthPage = location.pathname === '/auth' || location.pathname === '/admin-login';

  if (showSplash) {
    return <Splash />;
  }

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-1000">
      <Header />
      <ToastContainer />
      <main className="flex-grow">
        <Routes>
          {/* Main Landing/Home Route - Redirect to Auth if not logged in */}
          <Route 
            path="/" 
            element={
              !user ? <Navigate to="/auth" replace /> : 
              (user.role === 'restaurant_admin' ? <Navigate to="/restaurant-admin?tab=Dashboard" /> : <Home />)
            } 
          />

          {/* Protected Browsing Routes */}
          <Route 
            path="/restaurants" 
            element={
              !user ? <Navigate to="/auth" replace /> : 
              (user.role === 'restaurant_admin' ? <Navigate to="/restaurant-admin?tab=Dashboard" /> : <Restaurants />)
            } 
          />
          <Route 
            path="/menu" 
            element={
              !user ? <Navigate to="/auth" replace /> : 
              (user.role === 'restaurant_admin' ? <Navigate to="/restaurant-admin?tab=Dashboard" /> : <Menu />)
            } 
          />
          <Route 
            path="/cart" 
            element={
              !user ? <Navigate to="/auth" replace /> : 
              (user.role === 'restaurant_admin' ? <Navigate to="/restaurant-admin?tab=Dashboard" /> : <Cart />)
            } 
          />
          <Route 
            path="/orders" 
            element={
              !user ? <Navigate to="/auth" replace /> : 
              (user.role === 'restaurant_admin' ? <Navigate to="/restaurant-admin?tab=Dashboard" /> : <Orders />)
            } 
          />

          {/* Profile and Admin Routes */}
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
          <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Navigate to="/admin-login" />} />
          <Route path="/admin-login" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <AdminAuth />} />
          <Route path="/restaurant-admin" element={user?.role === 'restaurant_admin' ? <RestaurantAdmin /> : <Navigate to="/auth" />} />
          
          {/* Auth Route - Redirect away if already logged in */}
          <Route 
            path="/auth" 
            element={!user ? <Auth /> : (user.role === 'restaurant_admin' ? <Navigate to="/restaurant-admin?tab=Dashboard" /> : <Navigate to="/" />)} 
          />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* Hide footer on auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
};

export default App;
