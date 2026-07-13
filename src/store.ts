import { create } from 'zustand';
import { CartItem, MenuItem } from './types';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
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
  
  cart: [],
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
    return { cart: newCart, isCartOpen: true };
  }),
  
  removeFromCart: (itemId: string) => set((state) => ({
    cart: state.cart.filter((c) => c.menuItem.id !== itemId)
  })),
  
  updateQuantity: (itemId: string, quantity: number) => set((state) => {
    if (quantity <= 0) {
      return { cart: state.cart.filter((c) => c.menuItem.id !== itemId) };
    }
    return {
      cart: state.cart.map((c) => 
        c.menuItem.id === itemId ? { ...c, quantity } : c
      )
    };
  }),

  clearCart: () => set({ cart: [] }),
  
  get cartTotal() {
    return get().cart.reduce((total, item) => {
      const price = item.menuItem.isSpecial && item.menuItem.specialPrice 
        ? item.menuItem.specialPrice 
        : item.menuItem.price;
      return total + (price * item.quantity);
    }, 0);
  },
  
  get cartCount() {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));
