import { useState } from 'react';
import { type ExpenseItem, CATEGORIES } from '../types';

interface AddExpenseFormProps {
  onAddExpense: (expense: ExpenseItem) => void;
}

// Defining the initial state outside the component for easy resets
const initialForm = {
  category: 'Food',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
};

export default function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  // Now using a single object to hold all form data
  const [form, setForm] = useState(initialForm);

  // A generic change handler that works for any input with a "name" attribute
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mapping the object state to the final ExpenseItem type
    onAddExpense({
      id: crypto.randomUUID(), // Generating unique ID here
      category: form.category,
      amount: parseFloat(form.amount) || 0,
      date: form.date,
      description: form.description.trim(),
    });

    // Resetting the form using the initial object
    setForm(initialForm);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
      <h2 className="text-lg font-semibold text-zinc-800 mb-5">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm bg-white"
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
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1.5">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm"
          />
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
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 text-zinc-800 text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}