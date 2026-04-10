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
    <div className="rounded-xl bg-white shadow-md border border-gray-100 overflow-hidden">
      {/* Header with title and filter dropdown */}
      <div className="flex justify-between items-center px-5 py-4 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Expenses</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Showing {filteredExpenses.length} of {expenses.length} expense
            {expenses.length !== 1 ? "s" : ""}
          </p>
        </div>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Expense rows or empty state */}
      <div className="divide-y divide-gray-50">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-14 px-5">
            <div className="text-5xl mb-4 opacity-80">📋</div>
            <p className="text-gray-500 font-medium text-base">
              No expenses found
              {filterCategory !== "All" ? ` in "${filterCategory}"` : ""}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Add your first expense to get started!
            </p>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="px-5 py-4 flex justify-between items-center hover:bg-gray-50/70 transition-all duration-150"
            >
              {/* Left side: description, category, date */}
              <div className="min-w-0 mr-4">
                <p className="font-semibold text-gray-800 truncate">{expense.description}</p>
                <p className="text-sm text-gray-400 mt-0.5">
                  <span className="font-medium text-gray-500">{expense.category}</span>
                  {" "}&middot;{" "}
                  {formatDate(expense.date)}
                </p>
              </div>

              {/* Right side: amount and action buttons */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-bold text-gray-800 text-lg tabular-nums">
                  ₱{expense.amount.toLocaleString()}
                </span>
                <div className="flex gap-1.5">
                  {/* Edit button */}
                  <button
                    onClick={() => onEdit(expense)}
                    className="text-blue-500 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-500 border border-transparent hover:border-blue-500 transition-all duration-150"
                    title="Edit expense"
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${expense.description}"?`)) {
                        onDelete(expense.id);
                      }
                    }}
                    className="text-red-500 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-500 border border-transparent hover:border-red-500 transition-all duration-150"
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
