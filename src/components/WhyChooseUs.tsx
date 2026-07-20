import { Leaf, Truck, ShieldCheck, Smile, Utensils } from 'lucide-react';

import { motion } from 'motion/react';

export function WhyChooseUs() {
  const features = [
    {
      icon: <Leaf size={28} />,
      title: "Fresh Ingredients",
      description: "Locally sourced, organic produce and premium meats delivered daily.",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    {
      icon: <Truck size={28} />,
      title: "Fast Delivery",
      description: "Hot food at your doorstep in 30 minutes or less, guaranteed.",
      color: "text-primary-500",
      bg: "bg-primary-50 dark:bg-primary-500/10"
    },
    {
      icon: <Smile size={28} />,
      title: "Friendly Service",
      description: "Our staff is trained to provide a warm, welcoming experience.",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-500/10"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Hygienic Kitchen",
      description: "5-star food safety rating. We maintain the highest cleanliness standards.",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center z-10 shadow-xl border-4 border-stone-50 dark:border-stone-950">
              <Utensils size={32} className="text-primary-600" />
            </div>
            
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600" 
              alt="Chef cooking"
              className="rounded-3xl rounded-tr-none w-full h-[300px] object-cover"
            />
            <motion.img 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              src="https://images.unsplash.com/photo-1556206079-672ce3467b5b?auto=format&fit=crop&q=80&w=600" 
              alt="Bakery interior"
              className="rounded-3xl rounded-bl-none w-full h-[250px] object-cover mt-[50px]"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-6">
              Why Tastia is the right choice for you
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-10 text-lg">
              We believe that fast food shouldn't mean compromising on quality. From our kitchen to your table, we oversee every detail to ensure an unforgettable dining experience.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {features.map((feature, idx) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
