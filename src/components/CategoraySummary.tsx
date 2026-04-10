import { useMemo } from 'react';
import type { ExpenseItem, CATEGORIES } from '../types';

interface CategorySummaryProps {
  expenses: ExpenseItem[];
}

const CATEGORY_COLORS: Record<string, { bar: string; badge: string; text: string }> = {
  Food:          { bar: 'bg-orange-400', badge: 'bg-orange-100', text: 'text-orange-700' },
  Transport:     { bar: 'bg-blue-400',   badge: 'bg-blue-100',   text: 'text-blue-700' },
  Bills:         { bar: 'bg-red-400',    badge: 'bg-red-100',    text: 'text-red-700' },
  Shopping:      { bar: 'bg-pink-400',   badge: 'bg-pink-100',   text: 'text-pink-700' },
  Health:        { bar: 'bg-green-400',  badge: 'bg-green-100',  text: 'text-green-700' },
  Entertainment: { bar: 'bg-purple-400', badge: 'bg-purple-100', text: 'text-purple-700' },
  Other:         { bar: 'bg-zinc-400',   badge: 'bg-zinc-100',   text: 'text-zinc-600' },
};

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
  const maxAmount = summary[0]?.total ?? 1;

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
          Total: <span className="font-semibold text-zinc-700">₱{grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
        </span>
      </div>

      <div className="space-y-4">
        {summary.map(({ category, total }) => {
          const pct = grandTotal > 0 ? (total / grandTotal) * 100 : 0;
          const barWidth = maxAmount > 0 ? (total / maxAmount) * 100 : 0;
          const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['Other'];

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge} ${colors.text}`}>
                    {category}
                  </span>
                  <span className="text-xs text-zinc-400">{pct.toFixed(1)}%</span>
                </div>
                <span className="text-sm font-semibold text-zinc-700">
                  ₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Category count note */}
      <p className="mt-5 text-xs text-zinc-400 text-right">
        {summary.length} {summary.length === 1 ? 'category' : 'categories'} · {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
      </p>
    </div>
  );
}