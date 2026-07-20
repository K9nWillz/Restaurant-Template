import { useState, useEffect } from 'react';
import { Loader2, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { useStore } from '../store';

export function MenuManager({ adminPin }: { adminPin: string }) {
  const { menuItems, fetchMenu } = useStore();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this menu item?")) return;
    try {
      await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': adminPin }
      });
      fetchMenu();
    } catch (e) {}
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = isAdding ? '/api/menu' : `/api/menu/${isEditing}`;
      const method = isAdding ? 'POST' : 'PUT';
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin
        },
        body: JSON.stringify(editForm)
      });
      await fetchMenu();
      setIsEditing(null);
      setIsAdding(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setIsAdding(true);
            setEditForm({ name: '', description: '', price: 0, image: '', category: 'Meals', rating: 5, reviews: 0, popular: false, isSpecial: false });
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-stone-50 dark:bg-stone-900 border border-primary-500/50 p-6 rounded-xl space-y-4">
          <h3 className="font-bold text-lg mb-4 text-stone-900 dark:text-white">
            {isAdding ? 'Add Menu Item' : 'Edit Menu Item'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Name</label>
              <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Price (₦)</label>
              <input type="number" value={editForm.price || 0} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Description</label>
              <textarea value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Image URL</label>
              <input type="text" value={editForm.image || ''} onChange={e => setEditForm({...editForm, image: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Category</label>
              <select value={editForm.category || 'Meals'} onChange={e => setEditForm({...editForm, category: e.target.value as any})} className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white">
                <option value="Meals">Meals</option>
                <option value="Bakery">Bakery</option>
                <option value="Cakes">Cakes</option>
                <option value="Drinks">Drinks</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <label className="flex items-center gap-2 cursor-pointer text-stone-900 dark:text-white">
                <input type="checkbox" checked={editForm.popular || false} onChange={e => setEditForm({...editForm, popular: e.target.checked})} className="rounded border-stone-300" />
                Popular
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-stone-900 dark:text-white">
                <input type="checkbox" checked={editForm.isSpecial || false} onChange={e => setEditForm({...editForm, isSpecial: e.target.checked})} className="rounded border-stone-300" />
                Daily Special
              </label>
            </div>
            {editForm.isSpecial && (
              <div>
                <label className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Special Price (₦)</label>
                <input type="number" value={editForm.specialPrice || 0} onChange={e => setEditForm({...editForm, specialPrice: Number(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white" />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg">Cancel</button>
            <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2">
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {menuItems.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-xl">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 text-center sm:text-left">
              <h4 className="font-bold text-stone-900 dark:text-white">{item.name}</h4>
              <p className="text-sm text-stone-500 line-clamp-1">{item.description}</p>
            </div>
            <div className="font-bold text-primary-600">₦{item.price}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setIsEditing(item.id); setEditForm(item); setIsAdding(false); }} className="p-2 text-stone-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
