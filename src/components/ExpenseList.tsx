import type { ExpenseItem } from '../types';

interface ExpenseListProps {
  expenses: ExpenseItem[];
  filterCategory: string;
  onFilterChange: (category: string) => void;
  // Passed down for Jebron and Pete's components
  onEdit: (expense: ExpenseItem) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, filterCategory, onFilterChange, onEdit, onDelete }: ExpenseListProps) {
  // Logic to filter the expenses array based on filterCategory goes here

  return (
    <div className="border p-4 rounded bg-white shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Expenses</h2>
        {/* Filter dropdown goes here, calling onFilterChange */}
      </div>

      <div>
        {expenses.map(expense => (
          <div key={expense.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <p className="font-bold">{expense.description}</p>
              <p className="text-sm text-gray-500">{expense.category} - ₱{expense.amount}</p>
            </div>
            <div className="flex gap-2">
 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}