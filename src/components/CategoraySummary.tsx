import { ExpenseItem } from '../types/expense';

interface CategorySummaryProps {
  expenses: ExpenseItem[];
}

export default function CategorySummary({ expenses }: CategorySummaryProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-5">Spending by Category</h2>
        <p className="py-10 text-center text-sm text-zinc-400">No data yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-zinc-800">Spending by Category</h2>
        <span className="text-sm text-zinc-400">Total: {/* Total will go here */}</span>
      </div>
      <div className="space-y-4">
        {/* Category list will render here */}
      </div>
    </div>
  );
}