import type { ExpenseItem } from '../types';

interface EditExpenseProps {
  expense: ExpenseItem;
  onEditSubmit: (updatedExpense: ExpenseItem) => void;
}

export default function EditExpense({ expense, onEditSubmit }: EditExpenseProps) {
  return (
    <button className="text-blue-500 hover:text-blue-700">
      Edit
    </button>
    // Needs logic to open a small modal or form to change the values
  );
}