import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Moon, Sun, MapPin, Phone } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartCount, toggleCart, isDarkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Specials', href: '#specials' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/80 dark:bg-stone-950/80 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#" className="font-serif text-2xl font-bold tracking-tight text-primary-600 dark:text-primary-500">
              Lumina<span className="text-stone-900 dark:text-white">.</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-primary-600 dark:text-stone-300 dark:hover:text-primary-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} className="text-stone-300" /> : <Moon size={20} className="text-stone-600" />}
            </button>
            
            <button 
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} className={cn("transition-colors", isDarkMode ? "text-stone-300" : "text-stone-600")} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-primary-600 border-2 border-white dark:border-stone-950 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="hidden md:flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-colors shadow-sm shadow-primary-500/20"
            >
              Order Now
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 dark:text-stone-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-stone-950 pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-xl font-serif">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-stone-800 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-4"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto pb-12 flex flex-col gap-4">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-stone-600 dark:text-stone-400">
                <Phone size={20} />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400">
                <MapPin size={20} />
                <span>123 Culinary Ave, Food District</span>
              </div>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); toggleCart(); }}
                className="mt-6 w-full py-4 text-center font-medium text-white bg-primary-600 rounded-xl"
              >
                Start Your Order
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
