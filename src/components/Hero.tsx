import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { useStore } from '../store';

export function Hero() {
  const { toggleCart } = useStore();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Blobs/Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary-100/50 dark:bg-primary-900/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-amber-100/50 dark:bg-amber-900/10 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Fresh out of the oven
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-stone-900 dark:text-white leading-[1.1] mb-6">
            Where <span className="text-primary-600">passion</span> meets the plate.
          </h1>
          
          <p className="text-lg text-stone-600 dark:text-stone-400 mb-8 leading-relaxed max-w-xl">
            Experience the perfect blend of artisanal bakery classics and modern fast-casual dining. Crafted daily with love, locally sourced ingredients, and uncompromising quality.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={toggleCart}
              className="px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-medium flex items-center gap-2 hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
            >
              Order Online
              <ArrowRight size={18} />
            </button>
            <a 
              href="#menu"
              className="px-8 py-4 bg-white dark:bg-stone-900 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-700 rounded-full font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              Explore Menu
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="Customer" 
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-stone-950"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold-500 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                4.9/5 from over 2,000 reviews
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative lg:ml-auto"
        >
          {/* Main Image */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-200 dark:shadow-none aspect-[4/5] md:aspect-square w-full max-w-[500px] mx-auto border-8 border-white dark:border-stone-900">
            <img 
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000" 
              alt="Gourmet Burger" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          
          {/* Floating Card */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 flex items-center gap-4 pr-6"
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-2xl">
              🥐
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Bestseller</p>
              <p className="text-sm font-bold text-stone-900 dark:text-white">Butter Croissant</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
