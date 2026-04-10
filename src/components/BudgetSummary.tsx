import type { ExpenseItem } from '../types';

interface BudgetSummaryProps {
  expenses: ExpenseItem[];
  budget: number;
  onSetBudget: (amount: number) => void;
}

export default function BudgetSummary({ expenses, budget, onSetBudget }: BudgetSummaryProps) {
  // Logic to calculate total spending from the expenses array

  return (
    <div className="flex justify-between items-center bg-blue-100 p-4 rounded shadow">
      <div>
        <h2 className="text-lg font-bold">Total Spent: ₱0 /* replace with calculation */</h2>
        <p>Remaining Budget: ₱0 /* replace with calculation */</p>
      </div>
      <div>
        {/* Input and button to set new budget goes here */}
      </div>
    </div>
  );
}