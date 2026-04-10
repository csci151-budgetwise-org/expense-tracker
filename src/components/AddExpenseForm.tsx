import { useState } from 'react';
import type { ExpenseItem } from '../types';

interface AddExpenseProps {
  onAdd: (expense: Omit<ExpenseItem, 'id'>) => void;
}

export default function AddExpense({ onAdd }: AddExpenseProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      date,
    });

    setDescription('');
    setAmount('');
    setCategory('Food');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow flex flex-col gap-3">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Add New Expense</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-600">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded mt-1 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-colors font-semibold"
      >
        Save Expense
      </button>
    </form>
  );
}