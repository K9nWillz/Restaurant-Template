export function Newsletter() {
  return (
    <section className="py-20 bg-stone-100 dark:bg-stone-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-white mb-4">
          Join the Tastia Family
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about seasonal menus, exclusive discounts, and secret recipes.
        </p>
        
        <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-6 py-4 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-primary-500 outline-none text-stone-900 dark:text-white shadow-sm"
            required
          />
          <button 
            type="submit" 
            className="px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-medium hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-colors shadow-sm whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
