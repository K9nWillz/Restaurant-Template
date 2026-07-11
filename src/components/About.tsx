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
            <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-6">Our Story</h2>
            <h3 className="text-xl text-primary-600 font-medium mb-4">Born from a passion for honest, delicious food.</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
              Lumina started as a small neighborhood bakery with a simple mission: to bring artisanal quality to everyday dining. What began with our signature sourdough has blossomed into a full culinary experience where fast-casual meets gourmet.
            </p>
            <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
              We believe that food should not only taste incredible but also nourish the soul. That's why we partner with local farmers, use only the freshest ingredients, and prepare every meal with the same care and attention as if we were cooking for our own family.
            </p>
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 border-l-2 border-primary-500">
                <p className="text-3xl font-bold text-stone-900 dark:text-white mb-1">10+</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Years of Experience</p>
              </div>
              <div className="text-center px-4 py-2 border-l-2 border-primary-500">
                <p className="text-3xl font-bold text-stone-900 dark:text-white mb-1">50k+</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Happy Customers</p>
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
              src="https://images.unsplash.com/photo-1572288307684-25e2e8c253be?auto=format&fit=crop&q=80&w=800" 
              alt="Baker preparing dough" 
              className="rounded-[2.5rem] shadow-xl w-full h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
