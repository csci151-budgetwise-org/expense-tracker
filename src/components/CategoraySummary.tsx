import { useMemo } from 'react';
import type { ExpenseItem } from '../types';

interface CategorySummaryProps {
  expenses: ExpenseItem[];
}

export default function CategorySummary({ expenses }: CategorySummaryProps) {
  const summary = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const e of expenses) {
      totals[e.category] = (totals[e.category] ?? 0) + e.amount;
    }
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .map(([category, total]) => ({ category, total }));
  }, [expenses]);

  const grandTotal = summary.reduce((sum, s) => sum + s.total, 0);

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
        <span className="text-sm text-zinc-400">
          Total: <span className="font-semibold text-zinc-700">₱{grandTotal}</span>
        </span>
      </div>

      <div className="space-y-4">
        {summary.map(({ category, total }) => (
          <div key={category} className="flex justify-between items-center">
            <span>{category}</span>
            <span>₱{total}</span>
          </div>
        ))}
      </div>
      
      <p className="mt-5 text-xs text-zinc-400 text-right">
        {summary.length} {summary.length === 1 ? 'category' : 'categories'}
      </p>
    </div>
  );
}