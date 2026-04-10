import { useState } from 'react';
import type { ExpenseItem } from '../types';

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
              className={`flex-1 px-3 py-2.5 rounded-lg border text-sm ${error ? 'border-red-400 bg-red-50' : 'border-zinc-200'}`}
              autoFocus
            />
            <button onClick={handleSave} className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg">Save</button>
            <button onClick={handleCancel} className="px-4 py-2.5 border border-zinc-200 text-zinc-500 text-sm rounded-lg">Cancel</button>
          </div>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      )}

      {budget > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-3 bg-zinc-50 rounded-xl">
            <p className="text-xs text-zinc-400 mb-1">Budget</p>
            <p className="text-sm font-semibold text-zinc-700">₱{budget.toLocaleString('en-PH')}</p>
          </div>
          <div className="text-center p-3 bg-zinc-50 rounded-xl">
            <p className="text-xs text-zinc-400 mb-1">Spent</p>
            <p className="text-sm font-semibold text-zinc-700">₱{totalSpent.toLocaleString('en-PH')}</p>
          </div>
          <div className="text-center p-3 bg-zinc-50 rounded-xl">
            <p className="text-xs text-zinc-400 mb-1">Remaining</p>
            <p className={`text-sm font-semibold ${remaining < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
              ₱{Math.abs(remaining).toLocaleString('en-PH')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}