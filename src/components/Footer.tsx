import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  const socials = settings?.socials || { instagram: '#', facebook: '#', tiktok: '#' };
  const contact = settings?.contact || {
    address: '123 Culinary Avenue, Food District, NY 10001',
    phone: '+1 (234) 567-890',
    email: 'hello@luminabakery.com',
    hours: 'Mon-Fri 7 AM - 9 PM, Sat 8 AM - 10 PM, Sun 9 AM - 8 PM'
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-20 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <a href="#" className="font-serif text-3xl font-bold text-white tracking-tight block">
              Tastia<span className="text-primary-500">.</span>
            </a>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              Elevating fast-casual dining and artisanal baking. Fresh ingredients, honest cooking, and a passion for flavor.
            </p>
            <div className="flex gap-4">
              <a href={socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={18} />
              </a>
              <a href={socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={18} />
              </a>
              <a href={socials.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <span className="sr-only">TikTok</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#menu" className="hover:text-primary-500 transition-colors">Our Menu</a></li>
              <li><a href="#specials" className="hover:text-primary-500 transition-colors">Daily Specials</a></li>
              <li><a href="#about" className="hover:text-primary-500 transition-colors">Our Story</a></li>
              <li><a href="#gallery" className="hover:text-primary-500 transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Catering</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Hours</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-primary-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line text-stone-300 leading-relaxed">{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 text-sm text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Tastia Restaurant & Eats. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
