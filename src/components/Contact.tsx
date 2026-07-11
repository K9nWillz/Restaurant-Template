import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-8">
              Have a question about our menu, catering services, or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white mb-1">Visit Us</h4>
                  <p className="text-stone-600 dark:text-stone-400">123 Culinary Avenue<br/>Food District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white mb-1">Call Us</h4>
                  <p className="text-stone-600 dark:text-stone-400">+1 (234) 567-890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white mb-1">Email Us</h4>
                  <p className="text-stone-600 dark:text-stone-400">hello@luminabakery.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800">
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-stone-700 dark:text-stone-300">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-primary-500 outline-none text-stone-900 dark:text-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-stone-700 dark:text-stone-300">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-primary-500 outline-none text-stone-900 dark:text-white" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-stone-700 dark:text-stone-300">Subject</label>
                <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-primary-500 outline-none text-stone-900 dark:text-white" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-stone-700 dark:text-stone-300">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-primary-500 outline-none text-stone-900 dark:text-white resize-none" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
