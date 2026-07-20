import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Local Foodie",
    content: "The sourdough bread here is simply unmatched. It has the perfect crust and a chewy, flavorful interior. I come here every weekend for my pastry fix, and their truffle burger is the best in town.",
    image: "https://i.pravatar.cc/150?img=44"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    content: "Fast delivery without compromising on quality. The spicy honey chicken was still hot and incredibly crispy when it arrived. Tastia has elevated the fast-casual dining experience completely.",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Event Planner",
    content: "I recently ordered catering from Tastia for a corporate event, and everyone was blown away. The presentation was gorgeous, and the dark chocolate layer cake was the star of the show.",
    image: "https://i.pravatar.cc/150?img=5"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-white dark:bg-stone-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-4">What Our Guests Say</h2>
          <p className="text-stone-600 dark:text-stone-400">Don't just take our word for it.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-primary-100 dark:text-stone-800 z-0">
            <Quote size={120} className="rotate-180" />
          </div>
          
          <div className="relative z-10 bg-stone-50 dark:bg-stone-900 rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 dark:border-stone-800 min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-stone-950 shadow-md" 
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 text-gold-500 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-lg md:text-xl text-stone-700 dark:text-stone-300 font-medium mb-6 italic">
                    "{testimonials[currentIndex].content}"
                  </p>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-primary-600 transition-colors shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-primary-600 transition-colors shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
