import { useState } from 'react';
import type { ExpenseItem } from '../types';
import  { CATEGORIES } from '../types';


interface ExpenseListProps {
  expenses: ExpenseItem[];
  onEditExpense: (expense: ExpenseItem) => void;
  onDeleteExpense: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Bills: 'bg-red-100 text-red-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Health: 'bg-green-100 text-green-700',
  Entertainment: 'bg-purple-100 text-purple-700',
  Other: 'bg-zinc-100 text-zinc-600',
};

export default function ExpenseList({ expenses, onEditExpense, onDeleteExpense }: ExpenseListProps) {
  const [filter, setFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = expenses
    .filter((e) => filter === 'All' || e.category === filter)
    .sort((a, b) => {
      const valA = sortBy === 'date' ? new Date(a.date).getTime() : a.amount;
      const valB = sortBy === 'date' ? new Date(b.date).getTime() : b.amount;
      return sortDir === 'desc' ? valB - valA : valA - valB;
    });

  const toggleSort = (key: 'date' | 'amount') => {
    if (sortBy === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(key); setSortDir('desc'); }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-zinc-800">
          Expenses
          <span className="ml-2 text-sm font-normal text-zinc-400">({filtered.length})</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => toggleSort('date')}
            className={`text-xs px-2.5 py-1 rounded-md border transition ${sortBy === 'date' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
          >
            Date {sortBy === 'date' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
          </button>
          <button
            onClick={() => toggleSort('amount')}
            className={`text-xs px-2.5 py-1 rounded-md border transition ${sortBy === 'amount' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-zinc-200 text-zinc-500 hover:border-zinc-300'}`}
          >
            Amount {sortBy === 'amount' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition ${
              filter === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-zinc-200 text-zinc-500 hover:border-indigo-300 hover:text-indigo-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-zinc-400 text-sm">
          {expenses.length === 0 ? 'No expenses yet. Add your first one!' : 'No expenses in this category.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center gap-4 px-4 py-3 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 transition group"
            >
              {/* Category badge */}
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${CATEGORY_COLORS[expense.category] ?? 'bg-zinc-100 text-zinc-600'}`}>
                {expense.category}
              </span>

              {/* Description + date */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-700 truncate">{expense.description}</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {new Date(expense.date + 'T00:00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>

              {/* Amount */}
              <span className="text-sm font-semibold text-zinc-800 shrink-0">
                ₱{expense.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </span>

              {/* Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                <button
                  onClick={() => onEditExpense(expense)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}