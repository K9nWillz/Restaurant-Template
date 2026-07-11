import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

export function CartDrawer() {
  const { 
    isCartOpen, 
    toggleCart, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-stone-950 shadow-2xl z-[70] flex flex-col border-l border-stone-100 dark:border-stone-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-100 dark:border-stone-800">
              <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Cart
              </h2>
              <button 
                onClick={toggleCart}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
                  <div className="w-20 h-20 bg-stone-50 dark:bg-stone-900 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="text-stone-300 dark:text-stone-700" />
                  </div>
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={toggleCart}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Start exploring our menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.menuItem.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100 dark:border-stone-800">
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-stone-900 dark:text-white text-sm leading-tight">
                            {item.menuItem.name}
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.menuItem.id)}
                            className="text-stone-400 hover:text-accent-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-primary-600 font-medium text-sm mt-1">
                          ${((item.menuItem.isSpecial ? item.menuItem.specialPrice! : item.menuItem.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-2 bg-stone-50 dark:bg-stone-900 w-fit rounded-lg border border-stone-200 dark:border-stone-700 p-1">
                        <button 
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 rounded transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 rounded transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 text-sm">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 text-sm">
                    <span>Tax & Fees</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-stone-900 dark:text-white font-bold text-lg pt-3 border-t border-stone-200 dark:border-stone-700">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-all group">
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
