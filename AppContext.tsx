
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, CartItem, Order, OrderStatus, Restaurant, Dish, PaymentMethod } from './types';
import { RESTAURANTS as INITIAL_RESTAURANTS, DISHES as INITIAL_DISHES } from './constants';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  orders: Order[];
  placeOrder: (address: string, paymentMethod: PaymentMethod) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
  updateRestaurant: (restaurant: Restaurant) => void;
  deleteRestaurant: (id: string) => void;
  dishes: Dish[];
  addDish: (dish: Dish) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [dishes, setDishes] = useState<Dish[]>(() => {
    return INITIAL_DISHES.map((dish, index) => ({
      ...dish,
      restaurantId: INITIAL_RESTAURANTS[index % INITIAL_RESTAURANTS.length].id
    }));
  });

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart!`);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    setCart(prev => prev.filter(i => i.id !== itemId));
    if (item) showToast(`Removed ${item.name} from cart`, 'info');
  };

  const clearCart = () => setCart([]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const placeOrder = (address: string, paymentMethod: PaymentMethod) => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFeeThreshold = 500;
    const standardDeliveryFee = 40;
    const deliveryFee = subtotal > deliveryFeeThreshold ? 0 : standardDeliveryFee;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `#${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
      address,
      total,
      items: [...cart],
      restaurantName: cart[0]?.restaurantId ? (restaurants.find(r => r.id === cart[0].restaurantId)?.name || 'FoodieHub Restaurant') : 'Various Restaurants',
      paymentMethod,
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast("Order placed successfully!", "success");
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addRestaurant = (res: Restaurant) => setRestaurants(prev => [res, ...prev]);
  const updateRestaurant = (res: Restaurant) => setRestaurants(prev => prev.map(r => r.id === res.id ? res : r));
  const deleteRestaurant = (id: string) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
    setDishes(prev => prev.filter(d => d.restaurantId !== id));
    if (user?.role === 'restaurant_admin' && user.restaurantId === id) setUser(null);
    setCart(prev => prev.filter(item => item.restaurantId !== id));
    showToast("Restaurant deleted from database", "info");
  };

  const addDish = (dish: Dish) => setDishes(prev => [dish, ...prev]);
  const updateDish = (dish: Dish) => setDishes(prev => prev.map(d => d.id === dish.id ? dish : d));
  const deleteDish = (id: string) => {
    setDishes(prev => prev.filter(d => d.id !== id));
    showToast("Item removed from menu", "info");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(currentOrders => {
        let changed = false;
        const updatedOrders = currentOrders.map(order => {
          if (order.status === 'Delivered' || order.status === 'Cancelled') return order;
          
          let nextStatus: OrderStatus = order.status;
          if (order.status === 'Pending') nextStatus = 'Preparing';
          else if (order.status === 'Preparing') nextStatus = 'Out for Delivery';
          else if (order.status === 'Out for Delivery') nextStatus = 'Delivered';
          
          if (nextStatus !== order.status) {
            changed = true;
            return { ...order, status: nextStatus };
          }
          return order;
        });
        return changed ? updatedOrders : currentOrders;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{
      user, setUser, cart, addToCart, removeFromCart, updateCartQuantity, clearCart, 
      isDarkMode, toggleDarkMode, orders, placeOrder, updateOrderStatus,
      restaurants, addRestaurant, updateRestaurant, deleteRestaurant,
      dishes, addDish, updateDish, deleteDish, toasts, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
