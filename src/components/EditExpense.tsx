import { useEffect, useState } from 'react';
import type { ExpenseItem } from '../types';
import { CATEGORIES } from '../types';

interface EditExpenseModalProps {
  expense: ExpenseItem | null;
  onSave: (updated: ExpenseItem) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function EditExpenseModal({ expense, onSave, onDelete, onClose }: EditExpenseModalProps) {

  const [form, setForm] = useState({ category: '', amount: '', date: '', description: '' });

  useEffect(() => {
    if (expense) {
      setForm({
        category: expense.category,
        amount: String(expense.amount),
        date: expense.date,
        description: expense.description,
      });
    }
  }, [expense]);
  
  if (!expense) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <h2 className="text-base font-semibold text-zinc-800">Edit Expense</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1.5">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1.5">Amount (₱)</label>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0" step="0.01" className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1.5">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-zinc-500 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition">Cancel</button>
          <button className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">Save Changes</button>
        </div>
      </div>
    </div>
  );
}