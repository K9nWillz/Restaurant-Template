import { create } from 'zustand';
import { CartItem, MenuItem } from './types';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  menuItems: MenuItem[];
  fetchMenu: () => Promise<void>;
  cart: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const calculateTotal = (cart: CartItem[]) => cart.reduce((total, item) => {
  const price = item.menuItem.isSpecial && item.menuItem.specialPrice 
    ? item.menuItem.specialPrice 
    : item.menuItem.price;
  return total + (price * item.quantity);
}, 0);

const calculateCount = (cart: CartItem[]) => cart.reduce((count, item) => count + item.quantity, 0);

export const useStore = create<AppState>((set, get) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newMode };
  }),
  
  menuItems: [],
  fetchMenu: async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        set({ menuItems: data });
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  },
  
  cart: [],
  cartTotal: 0,
  cartCount: 0,
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  addToCart: (item: MenuItem, quantity = 1) => set((state) => {
    const existingItem = state.cart.find((c) => c.menuItem.id === item.id);
    let newCart;
    
    if (existingItem) {
      newCart = state.cart.map((c) => 
        c.menuItem.id === item.id 
          ? { ...c, quantity: c.quantity + quantity } 
          : c
      );
    } else {
      newCart = [...state.cart, { menuItem: item, quantity }];
    }
    
    // Automatically open cart when adding
    return { 
      cart: newCart, 
      cartTotal: calculateTotal(newCart),
      cartCount: calculateCount(newCart),
      isCartOpen: true 
    };
  }),
  
  removeFromCart: (itemId: string) => set((state) => {
    const newCart = state.cart.filter((c) => c.menuItem.id !== itemId);
    return {
      cart: newCart,
      cartTotal: calculateTotal(newCart),
      cartCount: calculateCount(newCart)
    };
  }),
  
  updateQuantity: (itemId: string, quantity: number) => set((state) => {
    if (quantity <= 0) {
      const newCart = state.cart.filter((c) => c.menuItem.id !== itemId);
      return { 
        cart: newCart,
        cartTotal: calculateTotal(newCart),
        cartCount: calculateCount(newCart)
      };
    }
    const newCart = state.cart.map((c) => 
      c.menuItem.id === itemId ? { ...c, quantity } : c
    );
    return {
      cart: newCart,
      cartTotal: calculateTotal(newCart),
      cartCount: calculateCount(newCart)
    };
  }),

  clearCart: () => set({ cart: [], cartTotal: 0, cartCount: 0 })
}));
