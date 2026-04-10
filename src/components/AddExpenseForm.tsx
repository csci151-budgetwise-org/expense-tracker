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

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('Food');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>
      
      <input 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        type="text" 
      />

      <input 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        type="number" 
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Shopping">Shopping</option>
      </select>

      <input 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        type="date" 
      />

      <button type="submit">Save Expense</button>
    </form>
  );
}