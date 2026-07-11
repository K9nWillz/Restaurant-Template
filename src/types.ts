export type Category = 'Meals' | 'Bakery' | 'Cakes' | 'Drinks' | 'Snacks' | 'All';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  reviews: number;
  popular?: boolean;
  isSpecial?: boolean;
  specialPrice?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
