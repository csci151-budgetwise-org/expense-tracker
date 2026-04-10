/* eslint-disable react-hooks/set-state-in-effect */
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
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (expense) {
      setForm({
        category: expense.category,
        amount: String(expense.amount),
        date: expense.date,
        description: expense.description,
      });
      setConfirmDelete(false);
    }
  }, [expense]);
  
  if (!expense) return null;

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      newErrors.amount = 'Enter a valid amount greater than 0';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({
      id: expense.id,
      category: form.category,
      amount: parseFloat(form.amount),
      date: form.date,
      description: form.description.trim(),
    });
  };

  const handleDelete = () => {
    onDelete(expense.id);
    onClose();
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
        {!confirmDelete ? ( 
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1.5">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          ) : (
            <div className="px-6 py-5 space-y-4">
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
                {errors.amount && <p className="text-red-500">{errors.amount}</p>}
              </div>
            </div>
    )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 flex justify-between">
          {!confirmDelete ? (
            <>
              {/* This Delete button is new */}
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Delete
              </button>
              <div className="flex gap-2">
                {/* Your existing Cancel and Save buttons go here */}
                <button onClick={onClose} className="...">Cancel</button>
                <button onClick={handleSave} className="...">Save Changes</button>
              </div>
            </>
          ) : (
            <>
              {/* These confirmation buttons are new */}
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-sm text-zinc-500 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition"
              >
                Keep It
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Yes, Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}