import { Clock, TimerReset, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../store';

export function DailySpecials() {
  const { addToCart, menuItems } = useStore();
  const specials = menuItems.filter(item => item.isSpecial);

  if (specials.length === 0) return null;

  return (
    <section id="specials" className="py-24 bg-stone-50 dark:bg-stone-900 relative overflow-hidden">
      {/* Decorative SVG pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1c1917 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-500 text-sm font-bold mb-4 uppercase tracking-wider">
              <Flame size={16} />
              Limited Time
            </div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-4">Daily Specials</h2>
            <p className="text-stone-600 dark:text-stone-400">
              Exclusive creations and discounted favorites available only for today. Don't miss out on these chef-curated selections.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-stone-950 px-4 py-2 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 shrink-0">
            <Clock size={20} className="text-primary-600" />
            <div className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Ends in: <span className="text-accent-500 font-bold tabular-nums">04:23:59</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {specials.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-stone-950 rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-lg shadow-stone-200/40 dark:shadow-none border border-stone-100 dark:border-stone-800 group"
            >
              <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto relative overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                  <TimerReset size={14} />
                  Special Offer
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center flex-1">
                <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-white mb-2">{item.name}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <p className="text-sm text-stone-400 line-through mb-0.5">₦{item.price.toFixed(2)}</p>
                    <p className="text-3xl font-bold text-primary-600">₦{item.specialPrice?.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-medium hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
