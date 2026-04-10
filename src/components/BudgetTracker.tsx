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

  // Formatting Helper
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP',
      minimumFractionDigits: 2 
    }).format(val);

  const getBarColor = () => {
    if (pct >= 100) return 'bg-rose-500';
    if (pct >= 85) return 'bg-amber-500';
    if (pct >= 60) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const getStatusColor = () => {
    if (remaining < 0) return 'text-rose-600';
    if (pct >= 85) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const handleSave = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      setError('Enter a valid amount');
      return;
    }
    onSetBudget(val);
    handleCancel();
  };

  const handleCancel = () => {
    setInputValue('');
    setError('');
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <div>
          <h2 className="text-base font-bold text-zinc-800">Budget Overview</h2>
          <p className="text-xs text-zinc-500">Track your monthly spending limit</p>
        </div>
        {!editing && (
          <button
            onClick={() => { setEditing(true); setInputValue(String(budget)); }}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-all active:scale-95"
          >
            {budget > 0 ? 'Edit Limit' : 'Set Limit'}
          </button>
        )}
      </div>

      <div className="p-6">
        {editing ? (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Configure Monthly Limit</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium">₱</span>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError(''); }}
                  className={`w-full pl-7 pr-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    error ? 'border-rose-400 bg-rose-50 ring-rose-100' : 'border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
                  autoFocus
                />
              </div>
              <button onClick={handleSave} className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-zinc-200 active:scale-95">
                Save
              </button>
              <button onClick={handleCancel} className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-600 text-sm font-bold rounded-xl hover:bg-zinc-50 transition-all">
                Close
              </button>
            </div>
            {error && <p className="mt-2 text-xs font-medium text-rose-500 flex items-center gap-1"><span>info</span> {error}</p>}
          </div>
        ) : budget === 0 ? (
          <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-zinc-100 rounded-2xl">
            <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center mb-3">
               <span className="text-zinc-400">₱</span>
            </div>
            <p className="text-sm text-zinc-500 font-medium">No spending limit defined yet</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Spent</p>
                <p className="text-lg font-black text-zinc-800">{formatCurrency(totalSpent)}</p>
              </div>
              <div className={`p-4 rounded-2xl border ${remaining < 0 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Remaining</p>
                <p className={`text-lg font-black ${getStatusColor()}`}>
                  {formatCurrency(remaining)}
                </p>
              </div>
            </div>

            {/* Visual Progress Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                   <span className="text-2xl font-black text-zinc-800">{pct.toFixed(0)}%</span>
                   <span className="text-xs font-bold text-zinc-400 ml-1">OF {formatCurrency(budget)}</span>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                  remaining < 0 ? 'bg-rose-100 text-rose-700' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {remaining < 0 ? 'Limit Exceeded' : 'Active Budget'}
                </span>
              </div>
              
              <div className="relative h-4 bg-zinc-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${getBarColor()}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 tracking-tighter uppercase">
                <span>0% started</span>
                <span>{pct >= 100 ? 'Limit Reached' : 'Monthly Limit'}</span>
              </div>
            </div>

            {/* Warning logic integrated into a cleaner callout */}
            {pct >= 85 && (
              <div className={`mt-6 p-3 rounded-xl flex items-start gap-3 border animate-bounce-subtle ${
                remaining < 0 ? 'bg-rose-50 border-rose-100 text-rose-800' : 'bg-amber-50 border-amber-100 text-amber-800'
              }`}>
                <span className="text-base">⚠️</span>
                <p className="text-xs font-semibold leading-relaxed">
                  {remaining < 0 
                    ? `Over-budget by ${formatCurrency(Math.abs(remaining))}. Consider reviewing your expenses.` 
                    : `Attention: You've used ${pct.toFixed(1)}% of your budget.`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}