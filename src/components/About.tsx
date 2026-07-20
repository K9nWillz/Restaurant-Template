import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="py-24 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-6">About Tastia</h2>
            <h3 className="text-xl text-primary-600 font-medium mb-4">Your favorite spot for delicious meals and pastries in Abakaliki.</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
              Tastia Restaurant, Bakery and Cafe is known for bringing the best flavors to your table. Locals love our special jollof rice, so be sure to try one of our many rice dishes alongside our freshly baked pastries and perfectly grilled fish.
            </p>
            <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
              Whether you're stopping by for a quick snack, a hearty lunch, or ordering delivery for the family, we pride ourselves on exceptional taste and quality. From spicy spaghetti to sweet cakes, there's something for everyone at Tastia.
            </p>
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 border-l-2 border-primary-500">
                <p className="text-3xl font-bold text-stone-900 dark:text-white mb-1">4.1★</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Over 150+ Reviews</p>
              </div>
              <div className="text-center px-4 py-2 border-l-2 border-primary-500">
                <p className="text-3xl font-bold text-stone-900 dark:text-white mb-1">100%</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Authentic Flavors</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900/20 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" 
              alt="Tastia Meals" 
              className="rounded-[2.5rem] shadow-xl w-full h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
