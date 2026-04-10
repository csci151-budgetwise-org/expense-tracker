import type { ExpenseItem } from '../types';

interface AddExpenseProps {
  onAdd: (expense: Omit<ExpenseItem, 'id'>) => void;
}

export default function AddExpense({ onAdd }: AddExpenseProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>
      
      <label>Description</label>
      <input type="text" placeholder="Description" />

      <label>Amount</label>
      <input type="number" placeholder="0.00" />

      <label>Category</label>
      <select>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Shopping">Shopping</option>
      </select>

      <label>Date</label>
      <input type="date" />

      <button type="submit">Save Expense</button>
    </form>
  );
}