import { useState } from 'react';
import { type ExpenseItem, CATEGORIES } from '../types';

interface AddExpenseFormProps {
  onAddExpense: (expense: ExpenseItem) => void;
}

const initialForm = {
  category: 'Food',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
};

export default function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<typeof initialForm>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Partial<typeof initialForm> = {};
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      newErrors.amount = 'Enter a valid amount greater than 0';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddExpense({
      id: crypto.randomUUID(),
      category: form.category,
      amount: parseFloat(form.amount),
      date: form.date,
      description: form.description.trim(),
    });

    setForm(initialForm);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
      <h2 className="text-lg font-semibold text-zinc-800 mb-5">Add Expense</h2>

      {submitted && (
        <div className="mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg animate-in fade-in slide-in-from-top-1">
          Expense added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1.5">Amount (₱)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            className={`w-full px-3 py-2.5 rounded-lg border text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
              errors.amount ? 'border-red-400 bg-red-50' : 'border-zinc-200'
            }`}
          />
          {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1.5">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 rounded-lg border text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
              errors.date ? 'border-red-400 bg-red-50' : 'border-zinc-200'
            }`}
          />
          {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1.5">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What did you spend on?"
            rows={2}
            className={`w-full px-3 py-2.5 rounded-lg border text-zinc-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
              errors.description ? 'border-red-400 bg-red-50' : 'border-zinc-200'
            }`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition-all duration-150 shadow-sm"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}