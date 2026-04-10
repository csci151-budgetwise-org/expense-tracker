import { useState } from 'react';
import { ExpenseItem } from '../types/expense';

interface BudgetTrackerProps {
  expenses: ExpenseItem[];
  budget: number;
  onSetBudget: (amount: number) => void;
}

export default function BudgetTracker({ expenses, budget, onSetBudget }: BudgetTrackerProps) {
  const [inputValue, setInputValue] = useState('');
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;
  const pct = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;

  const getBarColor = () => {
    if (pct >= 100) return 'bg-red-500';
    if (pct >= 80) return 'bg-orange-400';
    if (pct >= 60) return 'bg-yellow-400';
    return 'bg-emerald-400';
  };

  const getStatusColor = () => {
    if (remaining < 0) return 'text-red-500';
    if (pct >= 80) return 'text-orange-500';
    return 'text-emerald-600';
  };

  const getStatusLabel = () => {
    if (remaining < 0) return `Over budget by ₱${Math.abs(remaining).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
    if (pct >= 80) return 'Approaching limit';
    if (pct >= 60) return 'Spending moderately';
    return 'On track';
  };

  const handleSave = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      setError('Enter a valid budget greater than 0');
      return;
    }
    onSetBudget(val);
    setInputValue('');
    setEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setInputValue('');
    setError('');
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-zinc-800">Monthly Budget</h2>
        {!editing && (
          <button
            onClick={() => { setEditing(true); setInputValue(budget > 0 ? String(budget) : ''); }}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            {budget > 0 ? 'Edit' : 'Set Budget'}
          </button>
        )}
      </div>

      {editing && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-zinc-600 mb-1.5">Monthly Budget (₱)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => { setInputValue(e.target.value); setError(''); }}
              placeholder="e.g. 10000"
              min="0"
              step="0.01"
              className={`flex-1 px-3 py-2.5 rounded-lg border text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                error ? 'border-red-400 bg-red-50' : 'border-zinc-200'
              }`}
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
            />
            <button
              onClick={handleSave}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-500 text-sm rounded-lg transition"
            >
              Cancel
            </button>
          </div>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      )}

      {budget === 0 ? (
        <div className="py-8 text-center text-sm text-zinc-400">
          No budget set. Click "Set Budget" to get started.
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="text-center p-3 bg-zinc-50 rounded-xl">
              <p className="text-xs text-zinc-400 mb-1">Budget</p>
              <p className="text-sm font-semibold text-zinc-700">
                ₱{budget.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center p-3 bg-zinc-50 rounded-xl">
              <p className="text-xs text-zinc-400 mb-1">Spent</p>
              <p className="text-sm font-semibold text-zinc-700">
                ₱{totalSpent.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center p-3 bg-zinc-50 rounded-xl">
              <p className="text-xs text-zinc-400 mb-1">Remaining</p>
              <p className={`text-sm font-semibold ${getStatusColor()}`}>
                {remaining < 0 ? '-' : ''}₱{Math.abs(remaining).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
              <span>{pct.toFixed(1)}% used</span>
              <span className={`font-medium ${getStatusColor()}`}>{getStatusLabel()}</span>
            </div>
            <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${getBarColor()}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Warning alert */}
          {pct >= 80 && (
            <div className={`mt-4 px-4 py-2.5 rounded-lg text-sm ${
              remaining < 0
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-orange-50 border border-orange-200 text-orange-700'
            }`}>
              {remaining < 0
                ? '⚠️ You have exceeded your monthly budget.'
                : '⚠️ You are approaching your monthly budget limit.'}
            </div>
          )}
        </>
      )}
    </div>
  );
}
