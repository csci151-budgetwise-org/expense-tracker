import { useState } from 'react';
import type { ExpenseItem } from './types';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategorySummary from './components/CategorySummary';
import BudgetTracker from './components/BudgetTracker';
import EditExpenseModal from './components/EditExpense';

export default function App() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);

  // --- Handlers ---
  const handleAddExpense = (expense: ExpenseItem) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleEditExpense = (expense: ExpenseItem) => {
    setEditingExpense(expense);
  };

  const handleSaveEdit = (updated: ExpenseItem) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleCloseModal = () => {
    setEditingExpense(null);
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-base font-semibold text-zinc-800">ExpenseTracker</h1>
          </div>
          <div className="text-sm text-zinc-500">
            {expenses.length > 0 && (
              <span>
                {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} ·{' '}
                <span className="font-medium text-zinc-700">
                  ₱{totalSpent.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>{' '}
                total
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: form + budget + summary */}
          <div className="lg:col-span-1 space-y-6">
            <AddExpenseForm onAddExpense={handleAddExpense} />
            <BudgetTracker
              expenses={expenses}
              budget={budget}
              onSetBudget={setBudget}
            />
            <CategorySummary expenses={expenses} />
          </div>

          {/* Right column: list */}
          <div className="lg:col-span-2">
            <ExpenseList
              expenses={expenses}
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        </div>
      </main>

      {/* Edit/Delete Modal */}
      <EditExpenseModal
        expense={editingExpense}
        onSave={handleSaveEdit}
        onDelete={handleDeleteExpense}
        onClose={handleCloseModal}
      />
    </div>
  );
}