import type React from "react";
import { useState, useEffect } from 'react';
import { Save, Loader2, ListOrdered, Settings, Bell, Trash2 } from 'lucide-react';
import { MenuManager } from './MenuManager';

export function Admin() {
  const [activeTab, setActiveTab] = useState<'settings' | 'orders' | 'menu'>('settings');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [systemInstruction, setSystemInstruction] = useState('');
  const [socials, setSocials] = useState({ instagram: '', facebook: '', tiktok: '' });
  const [contact, setContact] = useState({ address: '', phone: '', email: '', hours: '' });
  const [hero, setHero] = useState({ bestsellerName: '', bestsellerImage: '', bestsellerIcon: '' });
  
  const [orders, setOrders] = useState<any[]>([]);
  const [unreadOrders, setUnreadOrders] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [authHint, setAuthHint] = useState('');
  
  const [newPin, setNewPin] = useState('');
  const [newHint, setNewHint] = useState('');

  const fetchAdminData = (pin: string) => {
    Promise.all([
      fetch('/api/settings', { headers: { 'x-admin-pin': pin } }).then(res => res.json()),
      fetch('/api/orders', { headers: { 'x-admin-pin': pin } }).then(res => res.json())
    ])
      .then(([settingsData, ordersData]) => {
        setWhatsappNumber(settingsData.whatsappNumber || '');
        setSystemInstruction(settingsData.systemInstruction || '');
        if (settingsData.socials) setSocials(settingsData.socials);
        if (settingsData.contact) setContact(settingsData.contact);
        if (settingsData.hero) setHero(settingsData.hero);
        
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
          setUnreadOrders(ordersData.filter((o: any) => o.status === 'pending').length);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    // Initial check to see if PIN is set
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.hasPin) {
          setIsSetupMode(true);
          setIsAuthenticated(true);
          fetchAdminData('');
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      fetch('/api/orders', { headers: { 'x-admin-pin': adminPin } })
        .then(res => res.json())
        .then(ordersData => {
          if (Array.isArray(ordersData)) {
            setOrders(ordersData);
            setUnreadOrders(ordersData.filter((o: any) => o.status === 'pending').length);
          }
        })
        .catch(console.error);
    }, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated, adminPin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setAdminPin(pinInput);
        setIsAuthenticated(true);
        fetchAdminData(pinInput);
      } else {
        setAuthError(data.error || 'Invalid PIN');
        if (data.hint) setAuthHint(data.hint);
      }
    } catch (err) {
      setAuthError('Error verifying PIN');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const payload: any = { whatsappNumber, systemInstruction, socials, contact, hero };
      if (newPin) {
        payload.pin = newPin;
        payload.hint = newHint;
      }

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save settings');
      
      if (newPin) {
        setAdminPin(newPin);
        setIsSetupMode(false);
        setNewPin('');
        setNewHint('');
      }

      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o);
        setOrders(updatedOrders);
        setUnreadOrders(updatedOrders.filter((o: any) => o.status === 'pending').length);
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
        headers: { 
          'x-admin-pin': adminPin
        }
      });
      if (res.ok) {
        const updatedOrders = orders.filter(o => o.id !== id);
        setOrders(updatedOrders);
        setUnreadOrders(updatedOrders.filter((o: any) => o.status === 'pending').length);
      }
    } catch (error) {
      console.error('Failed to delete order', error);
    }
  };

  if (isLoading && !isAuthenticated && !isSetupMode && !authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4">
        <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
              {isSetupMode ? 'Setup Admin PIN' : 'Admin Login'}
            </h1>
            <p className="text-stone-500 mt-2">
              {isSetupMode ? 'Create a PIN to secure the admin dashboard.' : 'Enter your PIN to access the dashboard.'}
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">PIN</label>
              <input
                type="password"
                required
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-center tracking-widest text-lg"
              />
            </div>
            
            {authError && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
                {authError}
              </div>
            )}
            
            {authHint && (
              <div className="text-sm text-center text-stone-500">
                Hint: {authHint}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : (isSetupMode ? 'Set PIN & Login' : 'Login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
            <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-stone-500 mt-2">Manage your business settings and orders</p>
            
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'}`}
              >
                <Settings size={18} /> Settings
              </button>
              <button 
                onClick={() => setActiveTab('menu')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'menu' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'}`}
              >
                <ListOrdered size={18} /> Menu
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors relative ${activeTab === 'orders' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'}`}
              >
                <ListOrdered size={18} /> Orders
                {unreadOrders > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {unreadOrders}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'settings' && (
              <form onSubmit={handleSave} className="space-y-8">
                {/* Chatbot Settings */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white pb-2 border-b border-stone-200 dark:border-stone-800">Chatbot Settings</h2>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">WhatsApp Number</label>
                    <input type="text" id="whatsapp" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="e.g., 1234567890" className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div>
                    <label htmlFor="instruction" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">System Instructions & Business Context</label>
                    <textarea id="instruction" rows={6} value={systemInstruction} onChange={(e) => setSystemInstruction(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm" />
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white pb-2 border-b border-stone-200 dark:border-stone-800">Social Links</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Instagram</label>
                      <input type="url" value={socials.instagram} onChange={(e) => setSocials({...socials, instagram: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Facebook</label>
                      <input type="url" value={socials.facebook} onChange={(e) => setSocials({...socials, facebook: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">TikTok</label>
                      <input type="url" value={socials.tiktok} onChange={(e) => setSocials({...socials, tiktok: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white pb-2 border-b border-stone-200 dark:border-stone-800">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Address</label>
                      <input type="text" value={contact.address} onChange={(e) => setContact({...contact, address: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Phone</label>
                      <input type="text" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Email</label>
                      <input type="email" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Hours</label>
                      <input type="text" value={contact.hours} onChange={(e) => setContact({...contact, hours: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white pb-2 border-b border-stone-200 dark:border-stone-800">Hero Section Bestseller</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Item Name</label>
                      <input type="text" value={hero.bestsellerName} onChange={(e) => setHero({...hero, bestsellerName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Icon (Emoji)</label>
                      <input type="text" value={hero.bestsellerIcon} onChange={(e) => setHero({...hero, bestsellerIcon: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Image URL</label>
                      <input type="url" value={hero.bestsellerImage} onChange={(e) => setHero({...hero, bestsellerImage: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white pb-2 border-b border-stone-200 dark:border-stone-800">Security</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 dark:bg-stone-950 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">New Admin PIN</label>
                      <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)} placeholder="Leave blank to keep current" className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">PIN Hint (Optional)</label>
                      <input type="text" value={newHint} onChange={(e) => setNewHint(e.target.value)} placeholder="e.g. My favorite year" className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                    </div>
                    <p className="text-sm text-stone-500 sm:col-span-2 mt-2">Setting a new PIN will update your login credentials immediately.</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
                  {message && <span className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</span>}
                  <div className="flex-1" />
                  <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50">
                    {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    Save Changes
                  </button>
                </div>
              </form>
            )}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-stone-500">No orders yet.</div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="border border-stone-200 dark:border-stone-800 rounded-xl p-6 bg-white dark:bg-stone-900">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-stone-900 dark:text-white text-lg">{order.name}</h3>
                          <p className="text-stone-500 text-sm">{order.email}</p>
                          <p className="text-stone-400 text-xs mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border outline-none ${
                              order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                              order.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                              'bg-stone-100 text-stone-700 border-stone-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-4 mb-4">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm py-1 border-b border-stone-200 dark:border-stone-800 last:border-0">
                            <span className="text-stone-700 dark:text-stone-300">{item.quantity}x {item.menuItem.name}</span>
                            <span className="text-stone-900 dark:text-white font-medium">₦{((item.menuItem.isSpecial ? item.menuItem.specialPrice : item.menuItem.price) * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center font-bold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                        <span>Total:</span>
                        <span>₦{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {activeTab === 'menu' && (
              <MenuManager adminPin={adminPin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
