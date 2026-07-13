import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingAction() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Initial slide out animation
    const timer1 = setTimeout(() => setIsExpanded(true), 1000);
    const timer2 = setTimeout(() => setIsExpanded(false), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <a 
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[88px] right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Order on WhatsApp"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <MessageCircle size={28} className="shrink-0" />
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.span
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap font-medium text-sm pr-2"
          >
            Order via WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}
