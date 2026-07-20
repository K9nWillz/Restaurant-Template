import type React from "react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useStore } from '../store';

export function CartDrawer() {
  const { 
    isCartOpen, 
    toggleCart, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartTotal 
  } = useStore();

  const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [whatsappNumber, setWhatsappNumber] = useState('1234567890');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      })
      .catch(console.error);
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          items: cart,
          total: cartTotal
        })
      });

      if (!response.ok) throw new Error('Failed to place order');

      clearCart();
      setView('success');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset view when closed
  const handleClose = () => {
    toggleCart();
    setTimeout(() => {
      setView('cart');
      setName('');
      setEmail('');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
              <div className="flex items-center gap-3">
                {view === 'checkout' && (
                  <button 
                    onClick={() => setView('cart')}
                    className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
                  {view === 'success' ? (
                    'Order Complete'
                  ) : view === 'checkout' ? (
                    'Checkout'
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      Your Cart
                    </>
                  )}
                </h2>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <X size={20} />
              </button>
            </div>

            {view === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-2">Order Received!</h3>
                <p className="text-stone-500 mb-8">
                  Your order has been saved. To finalize delivery details and payment, please click below to send your order details to us on WhatsApp.
                </p>
                <div className="space-y-3 w-full">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Tastia Restaurant! I just placed an order.\n\nName: ${name}\nEmail: ${email}\nTotal: ₦${cartTotal.toFixed(2)}\n\nPlease let me know the next steps for delivery and payment!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full py-3 bg-[#25D366] text-white rounded-xl font-medium items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all"
                  >
                    Complete on WhatsApp
                  </a>
                  <button 
                    onClick={handleClose}
                    className="w-full py-3 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white rounded-xl font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : view === 'checkout' ? (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 flex-1">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  
                  <div className="bg-stone-50 dark:bg-stone-900/50 p-4 rounded-xl mt-6 border border-stone-100 dark:border-stone-800">
                    <h4 className="font-medium text-sm text-stone-900 dark:text-white mb-3">Order Summary</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-2 text-sm">
                      {cart.map((item) => (
                        <div key={item.menuItem.id} className="flex justify-between text-stone-600 dark:text-stone-400">
                          <span>{item.quantity}x {item.menuItem.name}</span>
                          <span>₦{((item.menuItem.isSpecial ? item.menuItem.specialPrice! : item.menuItem.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
                    <div className="w-20 h-20 bg-stone-50 dark:bg-stone-900 rounded-full flex items-center justify-center">
                      <ShoppingBag size={32} className="text-stone-300 dark:text-stone-700" />
                    </div>
                    <p>Your cart is empty.</p>
                    <button 
                      onClick={handleClose}
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
                            ₦{((item.menuItem.isSpecial ? item.menuItem.specialPrice! : item.menuItem.price) * item.quantity).toFixed(2)}
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
            )}

            {/* Footer */}
            {cart.length > 0 && view !== 'success' && (
              <div className="p-6 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 text-sm">
                    <span>Subtotal</span>
                    <span>₦{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 text-sm">
                    <span>Tax & Fees</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-stone-900 dark:text-white font-bold text-lg pt-3 border-t border-stone-200 dark:border-stone-700">
                    <span>Total</span>
                    <span>₦{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                {view === 'cart' ? (
                  <button 
                    onClick={() => setView('checkout')}
                    className="w-full py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-all group"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting || !name || !email}
                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      'Complete Order'
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
