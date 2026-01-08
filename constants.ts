
import { Restaurant, Dish } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Sushi Sensation',
    description: 'Premium Japanese cuisine',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    deliveryTime: '30-40 min',
    isVeg: false,
    category: 'Sushi'
  },
  {
    id: '2',
    name: 'Pizza Palace',
    description: 'Authentic Italian pizzas made with love',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    deliveryTime: '25-35 min',
    isVeg: true,
    category: 'Pizza'
  },
  {
    id: '3',
    name: 'Burger Barn',
    description: 'Juicy burgers and crispy fries',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    deliveryTime: '15-25 min',
    isVeg: false,
    category: 'Burgers'
  },
  {
    id: '4',
    name: 'Green Garden',
    description: 'Fresh vegetarian and vegan delights',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    deliveryTime: '20-30 min',
    isVeg: true,
    category: 'Salads'
  },
  {
    id: '5',
    name: 'Sweet Treats',
    description: 'Desserts and bakery items',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    deliveryTime: '10-20 min',
    isVeg: true,
    category: 'Desserts'
  }
];

export const DISHES: Dish[] = [
  {
    id: 'd1',
    name: 'Caesar Salad',
    description: 'Crisp romaine with parmesan, croutons, and caesar dressing',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    prepTime: '10 min',
    isVeg: true,
    category: 'Salads'
  },
  {
    id: 'd2',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    prepTime: '15 min',
    isVeg: true,
    category: 'Desserts'
  },
  {
    id: 'd3',
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheddar cheese, lettuce, tomato, and special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    prepTime: '15 min',
    isVeg: false,
    category: 'Burgers'
  },
  {
    id: 'd4',
    name: 'Double Bacon Burger',
    description: 'Two beef patties with crispy bacon and cheese',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    prepTime: '20 min',
    isVeg: false,
    category: 'Burgers'
  },
  {
    id: 'd5',
    name: 'Dragon Roll',
    description: 'Shrimp tempura topped with eel and avocado',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    prepTime: '20 min',
    isVeg: false,
    category: 'Sushi'
  },
  {
    id: 'd6',
    name: 'Fresh Berry Smoothie',
    description: 'Blend of mixed berries, yogurt, and honey',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    prepTime: '5 min',
    isVeg: true,
    category: 'Drinks'
  },
  {
    id: 'd7',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    prepTime: '20 min',
    isVeg: true,
    category: 'Pizza'
  },
  {
    id: 'd8',
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni and melted cheese',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    prepTime: '25 min',
    isVeg: false,
    category: 'Pizza'
  },
  {
    id: 'd9',
    name: 'Salmon Roll',
    description: 'Fresh salmon with avocado and cucumber',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    prepTime: '15 min',
    isVeg: false,
    category: 'Sushi'
  }
];

export const CATEGORIES = [
  { name: 'Pizza', items: 12, icon: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=400&auto=format&fit=crop' },
  { name: 'Burgers', items: 8, icon: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop' },
  { name: 'Sushi', items: 15, icon: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=400&auto=format&fit=crop' },
  { name: 'Salads', items: 6, icon: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop' },
  { name: 'Desserts', items: 10, icon: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400&auto=format&fit=crop' },
  { name: 'Drinks', items: 14, icon: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=400&auto=format&fit=crop' },
];
