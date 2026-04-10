import { useMemo } from "react";
import type { ExpenseItem } from "../types";
import { CATEGORIES } from "../types";

interface ExpenseListProps {
  expenses: ExpenseItem[];
  filterCategory: string;
  onFilterChange: (category: string) => void;
  onEdit: (expense: ExpenseItem) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  filterCategory,
  onFilterChange,
  onEdit,
  onDelete,
}: ExpenseListProps) {
  // Filter expenses based on selected category
  const filteredExpenses = useMemo(() => {
    if (filterCategory === "All") return expenses;
    return expenses.filter((expense) => expense.category === filterCategory);
  }, [expenses, filterCategory]);

  // Format date to a readable string (e.g. "Apr 10, 2026")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="border p-4 rounded bg-white shadow">
      {/* Header with title and filter dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Expense count */}
      <p className="text-xs text-gray-400 mb-3">
        Showing {filteredExpenses.length} of {expenses.length} expense
        {expenses.length !== 1 ? "s" : ""}
      </p>

      {/* Expense rows or empty state */}
      <div>
        {filteredExpenses.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No expenses found
            {filterCategory !== "All" ? ` in "${filterCategory}"` : ""}. Start
            by adding one!
          </p>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="border-b last:border-b-0 py-3 flex justify-between items-center"
            >
              {/* Left side: description, category, date */}
              <div>
                <p className="font-bold">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {expense.category} &middot; {formatDate(expense.date)}
                </p>
              </div>

              {/* Right side: amount and action buttons */}
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">
                  ₱{expense.amount.toLocaleString()}
                </span>
                <div className="flex gap-2">
                  {/* Edit button — wired for Ken's EditExpense component */}
                  <button
                    onClick={() => onEdit(expense)}
                    className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    title="Edit expense"
                  >
                    Edit
                  </button>
                  {/* Delete button — wired for Jebron's DeleteExpense component */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${expense.description}"?`)) {
                        onDelete(expense.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                    title="Delete expense"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
