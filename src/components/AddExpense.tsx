import { useState } from 'react';
import type { ExpenseItem } from '../types';

interface AddExpenseProps {
  onAdd: (expense: Omit<ExpenseItem, 'id'>) => void;
}

export default function AddExpense({ onAdd }: AddExpenseProps) {
  // Needs state for description, amount, category, date

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to bundle inputs and call onAdd
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow">
      <h2 className="text-xl mb-4">Add New Expense</h2>
      {/* Form inputs go here */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Save Expense
      </button>
    </form>
  );
}