import type { ExpenseItem } from '../types';

interface EditExpenseModalProps {
  expense: ExpenseItem | null;
  onSave: (updated: ExpenseItem) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function EditExpenseModal({ expense, onSave, onDelete, onClose }: EditExpenseModalProps) {
  
  if (!expense) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <h2 className="text-base font-semibold text-zinc-800">Edit Expense</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body and Footer will go here */}
      </div>
    </div>
  );
}