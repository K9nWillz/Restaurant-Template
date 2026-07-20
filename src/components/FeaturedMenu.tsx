import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Star } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { Category, MenuItem } from '../types';
import { useStore } from '../store';
import { cn } from '../lib/utils';

export function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useStore();

  const categories: Category[] = ['All', 'Meals', 'Bakery', 'Cakes', 'Drinks', 'Snacks'];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-24 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-4">Explore Our Menu</h2>
          <p className="text-stone-600 dark:text-stone-400">
            From artisanal sourdough to gourmet burgers, discover a world of flavors crafted with the finest ingredients.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeCategory === cat 
                    ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" 
                    : "bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-100 dark:bg-stone-900 border-none rounded-full text-sm focus:ring-2 focus:ring-primary-500 dark:text-white transition-all outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 dark:text-stone-400 text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function MenuCard({ item, onAdd }: { key?: string | number; item: MenuItem; onAdd: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-stone-50 dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 hover:shadow-xl hover:shadow-stone-200/50 dark:hover:shadow-none transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.popular && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur text-stone-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Popular
          </div>
        )}
        <button 
          onClick={onAdd}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center text-stone-900 dark:text-white shadow-md hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors z-10 group-hover:scale-110 active:scale-95 duration-200"
          aria-label={`Add ₦{item.name} to cart`}
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-stone-900 dark:text-white text-lg leading-tight line-clamp-2">{item.name}</h3>
          <p className="font-bold text-primary-600 whitespace-nowrap">
            ₦{item.isSpecial && item.specialPrice ? item.specialPrice.toFixed(2) : item.price.toFixed(2)}
          </p>
        </div>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-4 line-clamp-2 flex-grow">
          {item.description}
        </p>
        <div className="flex items-center gap-1 mt-auto">
          <Star size={14} className="text-gold-500 fill-gold-500" />
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{item.rating}</span>
          <span className="text-sm text-stone-400">({item.reviews})</span>
        </div>
      </div>
    </motion.div>
  );
}
