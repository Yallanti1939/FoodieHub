
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  isVeg: boolean;
  category: string;
  ownerName?: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  prepTime: string;
  isVeg: boolean;
  category: string;
  restaurantId?: string; // Link dish to a specific restaurant
}

export interface CartItem extends Dish {
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  address: string;
  total: number;
  items: CartItem[];
  restaurantName: string;
  paymentMethod: PaymentMethod;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin' | 'restaurant_admin';
  restaurantId?: string; // For restaurant admins
}
